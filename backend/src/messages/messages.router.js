/**
 * Required External Modules and Interfaces
 */

const express = require("express");
const { getPublicMessage, getProtectedMessage } = require("./messages.service");
const { checkJwt } = require("../authz/check-jwt");
const jwtAuthz = require("express-jwt-authz")

/**
 * Router Definition
 */

const messagesRouter = express.Router();

/**
 * Controller Definitions
 */

// GET messages/

messagesRouter.get("/public-message", (req, res) => {
  const message = getPublicMessage();
  res.status(200).send(message);
});

messagesRouter.get("/protected-message", checkJwt, (req, res) => {
  const message = getProtectedMessage();
  res.status(200).send(message);
});

messagesRouter.get("/scoped-message",checkJwt,jwtAuthz(["default:admin"]), (req, res) => {
  const message = "hey this is scoped endpoint";
  res.status(200).send(message);
});

messagesRouter.get("/two-scoped-message",checkJwt,jwtAuthz(["default:admin","default:manager"],{
  customScopeKey: "permissions",
  checkAllScopes: true,
  failWithError: true
}), (req, res) => {
  const message = "hey this is two scoped endpoint";
  res.status(200).send(message);
});

messagesRouter.post("/create",checkJwt,jwtAuthz(["default:manager"],{
  customScopeKey: "permissions",
  checkAllScopes: true,
  failWithError: true
}), (req, res) => {
  console.log(req.body);
  res.status(200).json({message:"CREATED",data:req.body});
});



module.exports = {
  messagesRouter,
};
