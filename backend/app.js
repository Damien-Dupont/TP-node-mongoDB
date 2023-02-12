const express = require("express");
const app = express();
app.use(express.json());
const stuffRoutes = require(`./routes/stuff.js`);
const userRoutes = require(`./routes/user.js`);
const Thing = require("./models/thing");

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://damien:3n4fpNUD49Xr2wcD@cluster0.x5lva5i.mongodb.net/test",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie!"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// ROUTES POST
// app.post("/api/stuff", (req, res, next) => {
//   delete req.body._id;
//   const thing = new Thing({
//     ...req.body,
//   });
//   thing
//     .save()
//     .then(() => req.status(201).json({ message: "Objet enregistré !" }))
//     .catch((error) => {
//       console.log("app.post(/api/stuff/ Thing.save()");
//       res.status(400).json({ error });
//     });
// });

// ROUTES PUT
// app.put("/api/stuff/:id", (req, res, next) => {
//   Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Objet modifié !" }))
//     .catch((error) => res.status(400).json({ error }));
// });

// ROUTES GET
// app.get("/api/stuff/:id", (req, res, next) => {
//   Thing.findOne({ _id: req.params.id })
//     .then((thing) => res.status(200).json(thing))
//     .catch((error) => {
//       console.log("app.post(/api/stuff/ Thing.findOne()");
//       res.status(400).json({ error });
//     });
// });

// ROUTES DELETE
// app.delete("/api/stuff/:id", (req, res, next) => {
//   Thing.deleteOne({ _id: req.params.id })
//     .then(() => res.status(200).json({ message: "Objet supprimé !" }))
//     .catch((error) => res.status(400).json({ error }));
// });

// ROUTES USE

// app.use("/api/stuff/", (req, res, next) => {
//   Thing.find()
//     .then((things) => res.status(200).json(things))
//     .catch((error) => {
//       console.log("app.use(/api/stuff/ Thing.find()");
//       res.status(400).json({ error });
//     });
// });

// app.use("/api/stuff", (req, res, next) => {
//   const stuff = [
//     {
//       _id: "oeihfzoi",
//       title: "Mon premier objet",
//       description: "Les infos de mon premier objet",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       price: 4900,
//       userId: "qsomihvqios",
//     },
//     {
//       _id: "oeihfzeomihi",
//       title: "Mon premier deuxieme",
//       description: "Les infos de mon deuxieme objet",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       price: 2900,
//       userId: "qsomihvqios",
//     },
//   ];
//   res.status(200).json(stuff);
// });

// app.use("/api/stuff", (req, res, next) => {
//   const stuff = [
//     {
//       _id: "oeihfzeoi",
//       title: "Mon premier objet",
//       description: "info first object",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       price: 4900,
//       userId: "qsomihvqios",
//     },
//     {
//       _id: "oeihfzeomihi",
//       title: "Mon deuxieme objet",
//       description: "info second object",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       price: 2900,
//       userId: "qsomihvqios",
//     },
//   ];
//   res.status(200).json(stuff);
// });

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

// mongoose
//   .connect(
//     "mongodb+srv://damien:3n4fpNUD49Xr2wcD@cluster0.x5lva5i.mongodb.net/test",
//     { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("Connexion à MongoDB réussie!"))
//   .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(`/api/stuff`, stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
