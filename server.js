const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(cors());

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

app.post("/api/celtics", upload.single("img"), (req, res) => {
    const result = validatePlayer(req.body);

    console.log("before validate")
    if (result.error) {
        console.log("Invalid")
        res.status(400).send(result.error.details[0].message);
        return;
    }
    console.log("Valid")

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
        height: Joi.number().required (),
        weight: Joi.number().required (),
    });

    return schema.validate(player);
};

app.listen(3001, () => {
    console.log("I'm listening");
});
