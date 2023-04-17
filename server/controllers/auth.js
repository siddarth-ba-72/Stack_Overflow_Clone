import users from "../models/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existinguser = await users.findOne({ email });
    if (existinguser)
      return res.status(404).json({
        message: "User already Exists!",
      });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await users.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      result: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
    });
  };
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existinguser = await users.findOne({ email });
    if (!existinguser)
      return res.status(404).json({
        message: "User doesn't Exists!"
      });
    const isPasswordCrt = await bcrypt.compare(password, existinguser.password);
    if (!isPasswordCrt)
      return res.status(400).json({
        message: "Invalid credentials"
      });
    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      result: existinguser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Invalid Login details!",
    });
  };
};
