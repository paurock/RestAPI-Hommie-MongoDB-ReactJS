const express = require("express");
const Person = require("../models/person");

const router = express.Router();

// //get a list of person from db
// router.get("/persons", function(req, res, next) {
//   Person.find({}).then(function(persons) {
//     res.send(persons);
//   });
// });

// get a list of ninjas from the db
router.get("/persons", function(req, res, next) {
  Person.aggregate([
    {
      $geoNear: {
        near: {
          type: "point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        spherical: true,
        maxdistance: 100000,
        distanceField: "dist.calculated"
      }
    }
  ])
    .then(function(persons) {
      res.send(persons);
    })
    .catch(next);
});

router.post("/persons", function(req, res, next) {
  Person.create(req.body)
    .then(function(person) {
      res.send(person);
    })
    .catch(next);
});
//update a ninja
router.put("/persons/:id", function(req, res) {
  Person.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
    Person.findOne({_id: req.params.id}).then(function(person) {
      res.send(person);
    });
  });
});

//delete all
router.delete("/persons", function(req, res) {
  Person.deleteMany({}).then(function() {
    Person.find({}).then(function(persons) {
      res.send(persons);
    });
  });
});

//delete by id
router.delete("/persons/:id", function(req, res) {
  Person.findByIdAndRemove({_id: req.params.id}).then(function(person) {
    res.send(person);
  });
});

module.exports = router;
