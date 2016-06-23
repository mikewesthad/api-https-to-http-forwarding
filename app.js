const express = require("express");
const cors = require("cors");
const request = require("request");

const app = express();

// Cross-origin is necessary in order for node to accept requests 
const corsOptions = {
    origin: "https://www.bolank.com"
};

app.get("/", cors(corsOptions), function (req, res, next) {
    if (!req.query.url) {
        res.status(404).send("Bad url in request");
        next();
    }

    const apiUrl = decodeURIComponent(req.query.url);
    request(apiUrl)
        .on("error", function (error) {
            res.status(404).send("Error in making API request");
            next();
        })
        .pipe(res);
});

app.all("*", function (req, res) {
    res.status(404).send("Error, unhandled route!");
});

var port = process.env.PORT || 8080;
app.listen(port);