const express = require("express");

const router = express.Router();

//item models
const Item = require("../../models/Item");

//@route   GET api/items
//@desc    Get All Items
//@access  Public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

//@route   POST api/items
//@desc    Create a Item
//@access  Public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => console.log(err));
});

//@route   DELETE api/items/:id
//@desc    Delete a Item
//@access  Public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ sucess: true })))
    .catch((e) => res.status(404).json({ sucess: false }));
});
module.exports = router;
