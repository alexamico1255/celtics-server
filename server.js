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

    const player = {
      _id: players.length +1,
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
      player.img_name = "images/" + req.file.filename;
    }

    players.push(player);
    res.status(200).send(player);

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
  
 let players = [
    {
        "_id": 1,
        "img_name": "images/jrue_holiday.jpg",
        "name": "Jrue Holiday",
        "ppg": 12.5,
        "rebounds": 5.4,
        "assists": 4.8,
        "height": "6'4",
        "weight": "205lb",
        "age": 33,
        "college": "UCLA",
        "draft_pick": "R1 Pick 17",
        "drafted_by": "Philadelphia 76ers",
        "stats": ["12.5", "5.4", "4.8"]
    },
    {
        "_id": 2,
        "img_name": "images/derrick_white.jpg",
        "name": "Derrick White",
        "ppg": 15.2,
        "rebounds": 4.2,
        "assists": 5.2,
        "height": "6'4",
        "weight": "190lb",
        "age": 29,
        "college": "Colorado",
        "draft_pick": "R1 Pick 29",
        "drafted_by": "San Antonio Spurs",
        "stats": ["15.2", "4.2", "5.2"]
    },
    {
        "_id": 3,
        "img_name": "images/jaylen_brown.jpg",
        "name": "Jaylen Brown",
        "ppg": 23,
        "rebounds": 5.5,
        "assists": 3.6,
        "height": "6'6",
        "weight": "223lb",
        "age": 27,
        "college": "California",
        "draft_pick": "R1 Pick 3",
        "drafted_by": "Boston Celtics",
        "stats": ["23", "5.5", "3.6"]
    },
    {
        "_id": 4,
        "img_name": "images/jayson_tatum.jpg",
        "name": "Jayson Tatum",
        "ppg": 26.9,
        "rebounds": 8.1,
        "assists": 4.9,
        "height": "6'8",
        "weight": "210lb",
        "age": 26,
        "college": "Duke",
        "draft_pick": "R1 Pick 3",
        "drafted_by": "Boston Celtics",
        "stats": ["26.9", "8.1", "4.9"]
    },
    {
        "_id": 5,
        "img_name": "images/kristaps_porzingis.jpg",
        "name": "Kristaps Porzingis",
        "ppg": 20.1,
        "rebounds": 7.2,
        "assists": 2,
        "height": "7'2",
        "weight": "240lb",
        "age": 28,
        "college": "N/A (Latvia)",
        "draft_pick": "R1 Pick 4",
        "drafted_by": "New York Knicks",
        "stats": ["20.1", "7.2", "2"]
    },
    {
        "_id": 6,
        "img_name": "images/al_horford.jpg",
        "name": "Al Horford",
        "ppg": 18.6,
        "rebounds": 6.4,
        "assists": 2.6,
        "height": "6'9",
        "weight": "240lb",
        "age": 37,
        "college": "Florida",
        "draft_pick": "R1 Pick 3",
        "drafted_by": "Atlanta Hawks",
        "stats": ["18.6", "6.4", "2.6"]
    },
    {
        "_id": 7,
        "img_name": "images/peyton_pritchard.jpg",
        "name": "Peyton Pritchard",
        "ppg": 9.6,
        "rebounds": 3.2,
        "assists": 3.4,
        "height": "6'1",
        "weight": "195lb",
        "age": 26,
        "college": "Oregon",
        "draft_pick": "R1 Pick 26",
        "drafted_by": "Boston Celtics",
        "stats": ["9.6", "3.2", "3.4"]
    },
    {
        "_id": 8,
        "img_name": "images/sam_hauser.jpg",
        "name": "Sam Hauser",
        "ppg": 9.0,
        "rebounds": 3.5,
        "assists": 1.0,
        "height": "6'7",
        "weight": "217lb",
        "age": 26,
        "college": "Virginia",
        "draft_pick": "Undrafted",
        "drafted_by": "NA",
        "stats": ["9.0", "3.5", "1.0"]

        
    }
]


app.get("/api/players", (req, res) => {
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

app.put("/api/players/:id", upload.single("img"), (req, res) => {
  let player = players.find((e) => e._id === parseInt(req.params.id));

if (!player) {
  res.status(400).send("Player with given id was not found");
  return;
}
console.log("prior to validate");
const result = validatePlayer(req.body);
console.log("Before validate");
  if (result.error) {
    console.log("validate error");
    console.log(result.error.details[0].message);
    res.status(400).send(result.error.details[0].message);
    return;
  }


console.log("Player is " + player.name);
  
console.log("after validate");

      player.name = req.body.name;
      player.ppg = req.body.ppg;
      player.rebounds = req.body.rebounds;
      player.assists = req.body.assists;
      player.height = req.body.height;
      player.weight = req.body.weight;
      player.age = req.body.age;
      player.college = req.body.college;
      player.draft_pick = req.body.draft_pick;
      player.drafted_by = req.body.drafted_by;

      if (req.file) {
        player.img_name = "images/" + req.file.filename;
      }

  

  
  res.send("Player successfully updated");
});

app.delete("/api/players/:id", (req, res) => {
  const house = players.find((e) => h._id === parseInt(req.params.id));

  if (!house) {
    res.status(404).send("The house with the given id was not found");
  }

  const index = players.indexOf(player);
  players.splice(index, 1);
  res.send(players);
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