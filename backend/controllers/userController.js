import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";
import mongoose from "mongoose";

export const signup = async (req, res) => {
  try {
    const { fullName, username,email , password, confirmPassword, gender } = req.body;

    if (!fullName || !username ||!email || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
	  email,
      password: hashedPassword,
      gender,
    });

    await newUser.save();

    res.status(201).json({message:"signup suceessfull",
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  // Implement login logic here
  try {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

	if (!user || !isPasswordCorrect) {
		return res.status(400).json({ error: "Invalid username or password" });
	}

	

	res.status(200).json({
		_id: user._id,
		fullName: user.fullName,
		username: user.username,
		
	});
} catch (error) {
	console.log("Error in login controller", error.message);
	res.status(500).json({ error: "Internal Server Error" });
}
};

export const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in deleteUser controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

