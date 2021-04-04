const Item = require("../models/Item");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

module.exports = {
  // public /api/items
  getAllItem: asyncHandler(async (req, res) => {
    const item = await Item.find();
    if (!item) {
      res.status(401);
      throw new Error("Item not found");
    } else {
      res.status(200).json({
        item,
        message: "Berhasil mendapatkan data",
      });
    }
  }),

  getItemById: asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id);
    if (item) {
      res.status(200).json({
        message: "success",
        item,
      });
    } else {
      throw new Error("Item not found");
    }
  }),
};
