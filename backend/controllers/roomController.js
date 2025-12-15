import Room from "../models/Room.js";

export const createRoom = async (req, res) => {
  try {
    const { title, mode, allowedEmails } = req.body;

    const room = await Room.create({
      title,
      mode,
      allowedEmails: mode === "restricted" ? allowedEmails : [],
      createdBy: req.user.userId
    });

    res.status(201).json({
      message: "Room created successfully",
      roomId: room._id
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const joinRoom = async (req, res) => {
  try {
    const { roomId, email } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (!room.isActive) {
      return res.status(403).json({ message: "Voting has ended" });
    }

    // OPEN voting → allow directly
    if (room.mode === "open") {
      return res.json({ message: "Access granted", roomId });
    }

    // RESTRICTED voting
    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    if (!room.allowedEmails.includes(email)) {
      return res.status(403).json({ message: "You are not authorized to vote" });
    }

    if (room.authorizedVoters.includes(email)) {
      return res.status(403).json({ message: "You have already voted" });
    }

    // Mark email as authorized (entry granted)
    room.authorizedVoters.push(email);
    await room.save();

    res.json({ message: "Access granted", roomId });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const submitVote = async (req, res) => {
  try {
    const { roomId, voterId, choice } = req.body;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (!room.isActive) {
      return res.status(403).json({ message: "Voting has ended" });
    }

    // Check if already voted
    const alreadyVoted = room.votes.find(
      vote => vote.voterId === voterId
    );

    if (alreadyVoted) {
      return res.status(403).json({ message: "You have already voted" });
    }

    // Store vote
    room.votes.push({
      voterId,
      choice
    });

    await room.save();

    res.json({ message: "Vote submitted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getResults = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    // Only admin can see results
    if (room.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const results = {};

    room.votes.forEach(vote => {
      results[vote.choice] = (results[vote.choice] || 0) + 1;
    });

    res.json({
      roomTitle: room.title,
      totalVotes: room.votes.length,
      results
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
