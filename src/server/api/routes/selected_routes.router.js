"use strict";

// router setup

const express = require("express");
const router = express.Router({
  mergeParams: true
});
const { authorizeUser } = require("../lib/middleware/auth.middleware");

const ROLES = require("../../constants/roles");
// controllers
const selected_routesController = require("../controllers/selected_routes.controller");

//ENDPOINT: //api/selected_routes/ :GET
router.get(
  "/",
  //authorizeUser(ROLES.SUPER_USER, ROLES.ADMIN, ROLES.OPERATOR),
  (req, res, next) => {
    selected_routesController
      .getSelected_routes(req)
      .then(result => res.json(result))
      .catch(next);
  }
);

router.post(
  "/",
  //authorizeUser(ROLES.SUPER_USER, ROLES.ADMIN),
  (req, res, next) => {
    selected_routesController
      .createSelectedRoute({
        body: req.body
      })
      .then(result => res.json(result))
      .catch(next);
  }
);

module.exports = router;
