const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

module.exports = {
  // POST = /api/users/register
  regisUser: asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExits = await User.findOne({ email });
    if (userExits) {
      res.status(400);
      throw new Error("User already exits");
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user Data");
    }
  }),
  // POST = /api/users/login
  loginUser: asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }),

  // user profile
  getUserProfile: asyncHandler(async (req, res) => {
    // const id = req.params.id;
    // User.findById(id)
    //   .select("-password -role")
    //   .exec((err, data) => {
    //     if (!err) {
    //       res.status(200).json({
    //         message: `Berhasil Mendapatkan User Dengan ID : ${id}`,
    //         data,
    //       });
    //     } else {
    //       res
    //         .status(400)
    //         .send(`Gagal mendapatkan User Dengan ID : ${id}, ERR : ${err}`);
    //     }
    //   });
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  }),

  logout: (req, res) => {
    req.session.destroy();
    res.status(202).json({
      message: "success logout",
    });
  },

  updateProfile: asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
    // User.findByIdAndUpdate(id, updateData, (err, data) => {
    //   if (err || data === null) {
    //     res.status(400).json({
    //       message: "Gagal Update Data",
    //       timestamp: req.requestTime,
    //     });
    //   } else {
    //     res.status(200).json({
    //       message: `User dengan id = ${id} Berhasil diupdate`,
    //       timestamp: req.requestTime,
    //       beforeUpate: data,
    //       afterUpdate: updateData,
    //     });
    //   }
    // });
  }),
};
