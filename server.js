const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(cors());
const mongoose = require("mongoose");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

mongoose
  .connect("mongodb+srv://alexamico1255:ZAQxswCDE@atlascluster.drljrdt.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster")
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect to mongodb...", err));

  const playerSchema = new mongoose.Schema({
      name: String,
      ppg: Number,
      rebounds: Number,
      assists: Number,
      height: String,
      weight: String,
      age: Number,
      college: String,
      draft_pick: String,
      drafted_by: String,
      img_name: String,
  });

  const Player = mongoose.model("Player", playerSchema);


app.post("/api/celtics", upload.single("img"), async (req, res) => {
    const result = validatePlayer(req.body);

    console.log("before validate")
    if (result.error) {
        console.log("Invalid")
        res.status(400).send(result.error.details[0].message);
        return;
    }
    console.log("Valid")

    const player = new Player ({
      name: req.body.name,
      ppg: req.body.ppg,
      rebounds: req.body.rebounds,
      assists: req.body.assists,
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age,
      college: req.body.college,
      draft_pick: req.body.draft_pick,
      drafted_by: req.body.drafted_by,
    
    });

console.log (req.file.filename);

    if (req.file) {
      player.img_name = "images/" + req.file.filename;
    }

    const newPlayer = await player.save();
    res.send(newPlayer);

});


let record = {
    "easternTeams": [
      { "name": "Atlanta Hawks", "record": "2-2", "image": "images/team_logo/hawks.jpg" },
      { "name": "Brooklyn Nets", "record": "4-0", "image": "images/team_logo/nets.jpg" },
      { "name": "Charlotte Hornets", "record": "2-1", "image": "images/team_logo/hornets.jpg" },
      { "name": "Chicago Bulls", "record": "3-0", "image": "images/team_logo/bulls.jpg" },
      { "name": "Cleveland Cavaliers", "record": "2-1", "image": "images/team_logo/cavs.jpg" },
      { "name": "Detroit Pistons", "record": "3-0", "image": "images/team_logo/pistons.jpg" },
      { "name": "Indiana Pacers", "record": "3-2", "image": "images/team_logo/pacers.jpg" },
      { "name": "Miami Heat", "record": "3-0", "image": "images/team_logo/heat.jpg" },
      { "name": "Milwaukee Bucks", "record": "2-2", "image": "images/team_logo/bucks.jpg" },
      { "name": "New York Knicks", "record": "4-1", "image": "images/team_logo/knicks.jpg" },
      { "name": "Orlando Magic", "record": "2-1", "image": "images/team_logo/magic.jpg" },
      { "name": "Philadelphia 76ers", "record": "3-1", "image": "images/team_logo/76ers.jpg" },
      { "name": "Toronto Raptors", "record": "4-0", "image": "images/team_logo/raptors.jpg" },
      { "name": "Washington Wizards", "record": "4-0", "image": "images/team_logo/wizards.jpg" }
    ],
    "westernTeams": [
      { "name": "Dallas Mavericks", "record": "2-0", "image": "images/team_logo/mavs.jpg" },
      { "name": "Denver Nuggets", "record": "0-2", "image": "images/team_logo/nuggets.jpg" },
      { "name": "Golden State Warriors", "record": "1-1", "image": "images/team_logo/warriors.jpg" },
      { "name": "Houston Rockets", "record": "2-0", "image": "images/team_logo/rockets.jpg" },
      { "name": "Los Angeles Clippers", "record": "1-1", "image": "images/team_logo/clippers.jpg" },
      { "name": "Los Angeles Lakers", "record": "1-1", "image": "images/team_logo/lakers.jpg" },
      { "name": "Memphis Grizzlies", "record": "2-0", "image": "images/team_logo/grizzlies.jpg" },
      { "name": "Minnesota Timberwolves", "record": "1-1", "image": "images/team_logo/timberwolves.jpg" },
      { "name": "New Orleans Pelicans", "record": "2-0", "image": "images/team_logo/pelicans.jpg" },
      { "name": "Oklahoma City Thunder", "record": "1-1", "image": "images/team_logo/okc.jpg" },
      { "name": "Phoenix Suns", "record": "2-0", "image": "images/team_logo/suns.jpg" },
      { "name": "Portland Trail Blazers", "record": "2-0", "image": "images/team_logo/trailblazers.jpg" },
      { "name": "Sacramento Kings", "record": "2-0", "image": "images/team_logo/kings.jpg" },
      { "name": "San Antonio Spurs", "record": "2-0", "image": "images/team_logo/spurs.jpg" },
      { "name": "Utah Jazz", "record": "2-0", "image": "images/team_logo/jazz.jpg" }
    ]
  }
  

app.get("/api/players", async (req, res) => {
const players = await Player.find();
res.send(players);
});

app.get("/api/record", (req, res) => {
    res.send(record);
});

const validatePlayer = (player) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        name: Joi.string().min(3).required (),
        ppg: Joi.number().required (),
        rebounds: Joi.number().required (),
        assists: Joi.number().required (),
        height: Joi.string().required (),
        weight: Joi.string().required (),
        age: Joi.allow(""),
        college: Joi.allow(""),
        draft_pick: Joi.allow(""),
        drafted_by: Joi.allow(""),

    });

    return schema.validate(player);
};

app.put("/api/players/:id", upload.single("img"), async (req, res) => {
  const valid = validatePlayer(req.body);

  if (valid.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

let fieldsToUpdate = {
      name: req.body.name,
      ppg: req.body.ppg,
      rebounds: req.body.rebounds,
      assists: req.body.assists,
      height: req.body.height,
      weight: req.body.weight,
      age: req.body.age,
      college: req.body.college,
      draft_pick: req.body.draft_pick,
      drafted_by: req.body.drafted_by,
};

if (req.file) {
  fieldsToUpdate.img_name = "images/" + req.file.filename;
}

const wentThrough = await Player.updateOne(
  { _id: req.params.id },
  fieldsToUpdate
);

console.log("prior to validate");
const result = validatePlayer(req.body);
console.log("Before validate");
  if (result.error) {
    console.log("validate error");
    console.log(result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
    return;
  }

  
  res.send("Player successfully updated");
});

app.delete("/api/players/:id", async (req, res) => {
  const player = await Player.findByIdAndDelete(req.params.id);
  res.send(player)

  if (!player) {
    res.status(404).send("The player with the given id was not found");
    return;
  }

});


app.delete("/api/players/:id", (req, res) => {
  const player = players.find((e) => e._id === parseInt(req.params.id));

  if (!player) {
    res.status(404).send("The player with the given id was not found");
    return;
  }

  const index = players.indexOf(player);
  players.splice(index, 1);
  res.send(players);
});

app.listen(3001, () => {
  console.log("I'm listening");
});