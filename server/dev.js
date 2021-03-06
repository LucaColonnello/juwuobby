const devcert = require("devcert");
const { createServer } = require("https");
const { parse } = require("url");
const next = require("next");

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => devcert.certificateFor('localhost'))
  .then((httpsOptions) => {
    createServer(httpsOptions, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(port, (err) => {
      if (err) throw err;
      console.log("ready - started server on url: https://localhost:" + port);
    });
});
