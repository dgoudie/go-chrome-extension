const express = require("express");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const linkRequested = req.query.url;
  let response = "";
  switch (linkRequested) {
    case "google":
      response = "https://google.com";
      break;
    case "stan":
      response = "https://stan.systems";
      break;
  }
  res.send(response);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
