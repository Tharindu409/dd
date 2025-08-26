const Admin = require('../models/Admin');

exports.login = async (req, res) => {
  const { gmail, password } = req.body;

  if (!gmail || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const admin = await Admin.findOne({ gmail });

    if (!admin || admin.password !== password) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    res.status(200).json({ message: "Admin login successful", admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error during admin login." });
  }
};
