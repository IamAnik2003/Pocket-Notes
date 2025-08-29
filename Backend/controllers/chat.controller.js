const User = require('../DB/User.model.js');
const updateNotes = async (req, res) => {
  

  try {
    const { email, notes } = req.body;
      console.log(email)

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { userChatsInfo: notes },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser.userChatsInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update notes" });
  }
};



const getNotes = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ userChatsInfo: user.userChatsInfo || [] });
  } catch (err) {
    console.error("Error fetching notes:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports={updateNotes,getNotes}