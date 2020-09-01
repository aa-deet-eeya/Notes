const express = require("express");
const router = express.Router();
const Notes = require("../../models/schema");

// @route GET api/notes/
// @route POST api/notes/
// @access Public
router.get("/", (req, res, next) => {
  Notes.find()
    .select("_id date note title")
    .sort({ date: -1 })
    .then((notes) => {
      res.json(notes);
    });
});
router.post("/", (req, res, next) => {
  const newNote = new Notes({
    title: req.body.title,
    note: req.body.note,
  });

  newNote
    .save()
    .then((note) => {
      res.status(201).json({
        success: true,
        msg: "Note successfully saved",
        note,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err,
      });
    });
});

module.exports = router;
