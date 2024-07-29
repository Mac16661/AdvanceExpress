const express = require("express");
const router = express.Router();
// const path = require("path");
const data = {};
data.emplyees = require("../../data/employees.json");

//TODO: we can highlight all kind of "/" request inside of router.route
router
  .route("/")
  .get((req, res) => {
    res.json(data.emplyees);
  })
  .post((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .put((req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  })
  .delete((req, res) => {
    res.json({ id: req.body.id });
  });

//TODO: getting data using params (http://localhost:3000/employees/3) where 3 is the actual id
router.route("/:id").get((req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;
