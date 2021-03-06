const express = require("express");
const app = express();
const checker = require("./checker.js");

app.get("/", function (req, res) {
    res.send("Simple HTTPS Checker made by elementemerald#4175");
});

app.get("/check", function (req, res) {
    if (!req.query.url) return res.status(400).json({status: "err", message: "URL parameter not found"});
    if (req.query.url.includes("https://")) return res.json({status: "warn", message: "Protocol not needed"});
    checker.get(req.query.url).then(function (cert) {
        res.json({status: "ok", issuer: cert.issuer, valid_from: cert.valid_from, valid_to: cert.valid_to});
    });
});

app.listen(80);
