// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


// Aquí comienza mi aplicación
// Endponit
app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: new Date() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let fechaString = req.params.date_string;

  if (/\d{5,}/.test(fechaString)) {
    let dateInt = parseInt(fechaString);
    res.json({ unix: fechaString, utc: new Date(dateInt).toUTCString() });
  }

  let fechaObject = new Date(fechaString);
  // Vaildar fecha correcta
  console.log("log", fechaObject.toUTCString());
  console.log("log", fechaObject.valueOf());
  console.log("log-string", fechaObject.toString());
  (fechaObject.toString() === "Invalid Date")
    ? res.json({ error: "Invalid Date" })
    : res.json({ unix: fechaObject.valueOf(), utc: fechaObject.toUTCString() });
});
