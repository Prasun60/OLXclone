import express from "express";
import { register, login, logout } from "../Controllers/AuthController.js";
import {
  additem,
  purchaseitem,
  getallitems,
  getitem,
  getuseritems,
  userboughtitems,
  getallavailableitems,
} from "../Controllers/ItemController.js";
import upload from "../config/multerconfig.js";

const router = express.Router();

router.post("/additem", upload.single("image"), additem);
router.put("/purchaseitem/:id", purchaseitem);
router.get("/getallitems", getallitems);
router.get("/getitem", getitem);
router.get("/getuseritems", getuseritems);
router.get("/getuserboughtitems", userboughtitems);
router.get("/getavailabletitems", getallavailableitems);
// router.post("/login", login);
// router.post("/logout", logout);

export default router;
