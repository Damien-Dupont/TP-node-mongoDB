const Thing = require("../models/thing");

exports.createThing = (req, res, next) => {
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
      res.status(201).json({ message: `Post saved successfully !` });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      res.status(200).json(thing);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.modifyThing = (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    userId: req.body.userId,
    price: req.body.price,
  });
  Thing.updateOne({ _id: req.params.id }, thing)
    .then(() => {
      res.status(201).json({ message: `Thing updated successfully !` });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id }).then((thing) => {
    if (!thing) {
      res.status(404).json({ error: new Error("Thing not found!") });
    }
    if (thing.userId !== req.body.userId) {
      res
        .status(400)
        .json({ error: new Error("Unauthorized request: Invalid user ID") });
    }
    Thing.deleteOne({ _id: req.params.id })
      .then(() => {
        res.status(200).json({ message: "Deleted!" });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  });
};

exports.getAllStuff = (req, res, next) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
