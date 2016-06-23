const express = require("express");
const cors = require("cors");
const request = require("request");
const app = express();

// Enable CORS middleware on all routes
// This isn't a real security measure since origin can be spoofed, but it's a 
// step. Configure this to whitelist the origins you approve.
app.use(cors({
    origin: "https://www.mikewesthad.com"
}));

// GET requests to the root will:
//  - Get the "url" query parameter from the request
//  - Make a request to the url and stream it back to the client
// The client should make sure its query values are URI encoded:
//  - /?url=http%3A%2F%2Fwww.google.com
//  - /?url=http%3A%2F%2Fjsonplaceholder.typicode.com%2Fcomments%3FpostId%3D1
app.get("/", function (req, res) {
    // Check for "url" query parameter
    if (!req.query.url) {
        res.status(404).send("Bad url in request");
        return;
    }
    // Decode the "url" query value and open a request that points to that
    // location
    const apiUrl = decodeURIComponent(req.query.url);
    request(apiUrl)
        .on("error", function (error) {
            res.status(404).send("Error in making API request");
        })
        .pipe(res);
});

// Fallback for all other routes
app.all("*", function (req, res) {
    res.status(404).send("Error, unhandled route!");
});

app.listen(process.env.PORT || 8080);