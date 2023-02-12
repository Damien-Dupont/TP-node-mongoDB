const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const Thing = require("../models/thing");
const stuffCtrl = require("../controllers/stuff");

router.get("/", stuffCtrl.getAllStuff);
router.post("/", auth, stuffCtrl.createThing);
router.get("/:id", auth, stuffCtrl.getOneThing);
router.put("/:id", auth, stuffCtrl.modifyThing);
router.delete("/:id", auth, stuffCtrl.deleteThing);

router.post("/", (req, res, next) => {
  const thing = new Thing({
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    price: req.body.price,
  });
  thing
    .save()
    .then(() => {
      res.status(201).json({ message: "Post saved successfully!" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

router.put("/:id", (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,

    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    price: req.body.price,
  });
});

router.delete("/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Deleted!" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

router.get("/", stuffCtrl.getAllStuff);

router.get("/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(404).json({ error: error });
    });
});

router.get("/" + "", (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

module.exports = router;
