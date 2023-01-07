import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const register = async (req, res, next) => {
  try {
    console.log(req.body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      password: hash,
    });
    if (newUser) {
      const token = jwt.sign(
        { username: newUser.username, id: newUser._id },
        process.env.JWT
      );
      res.cookie("token", token, { httpOnly: true });
      // localStorage.setItem("token", token);
      await newUser.save();
      res.status(200).send({
        user: newUser,
        message: "User has been registerd!",
        token: token,
      });
    } else {
      res.status(400).json({ message: "User already exsist" });
    }
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username) {
      res.status(400).json({
        message: "username is empty",
      });
    }
    const currentuser = await User.findOne({ username: req.body.username });
    if (!currentuser) {
      res.status(400).json({
        message: "User is not registered / username is invalid",
      });
    } else {
      bcrypt.compare(password, currentuser.password, (err, result) => {
        //Comparing the hashed password
        if (err) {
          res.status(500).json({
            message: "Server error",
          });
        } else {
          if (result) {
            const token = jwt.sign(
              { username: username, id: currentuser._id },
              process.env.JWT,
              {
                expiresIn: "10h",
              }
            );
            res.cookie("token", token, { httpOnly: false });
            // localStorage.setItem("token", token);
            req.userid = currentuser.id;
            res.status(200).json({
              user: currentuser,
              message: "User has been signed in!",
              token: token,
            });
          } else {
            res.status(400).json({ message: "Enter correct password!" });
          }
        }
      });
    }
  } catch (err) {
    next(err);
  }
};
export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Cookie cleared!" });
  } catch (err) {
    next(err);
  }
};
