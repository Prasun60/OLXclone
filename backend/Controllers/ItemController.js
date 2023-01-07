import User from "../models/user.js";
import Item from "../models/item.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

dotenv.config();

export const additem = async (req, res, next) => {
  try {
    const { name, price, description, userId } = req.body;
    console.log(req);
    console.log(req.file.path);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result);
    const newItem = new Item({
      name: name,
      price: price,
      description: description,
      userId: userId,
      isSold: false,
      imageurl: result.secure_url,
      cloudId: result.public_id,
    });
    await newItem.save();
    res.status(200).send(newItem);
  } catch (err) {
    next(err);
  }
};
export const purchaseitem = async (req, res, next) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    updatedItem.save();
    res.status(200).json(updatedItem);
  } catch (err) {
    next(err);
  }
};

export const getallavailableitems = async (req, res, next) => {
  try {
    const allitems = await Item.find({ isSold: false });
    res.status(200).json(allitems);
  } catch (err) {
    next(err);
  }
};

export const getallitems = async (req, res, next) => {
  try {
    const allitems = await Item.find();
    res.status(200).json(allitems);
  } catch (err) {
    next(err);
  }
};

export const getitem = async (req, res, next) => {
  try {
    const item = await Item.findOne(req.params.id);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
};

export const getuseritems = async (req, res, next) => {
  try {
    const useritems = await Item.find({ userId: req.query.id });
    res.status(200).json(useritems);
  } catch (err) {
    next(err);
  }
};

export const userboughtitems = async (req, res, next) => {
  try {
    const userboughtitems = await Item.find({ buyerId: req.query.id });
    res.status(200).json(userboughtitems);
  } catch (err) {
    next(err);
  }
};
