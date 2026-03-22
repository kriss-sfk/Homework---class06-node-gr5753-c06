const http = require("http");
const url = require("url");

const handler = require("./handler/handler");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // ROUTING

  if (parsedUrl.pathname === "/welcome") {
    handler.handleWelcome(req, res);

  } else if (parsedUrl.pathname === "/person") {
    // query string
    handler.handlePerson(req, res, parsedUrl.query);

  } else if (parsedUrl.pathname === "/books" && req.method === "GET") {
    // READ
    handler.getAllBooks(req, res);

  } else if (parsedUrl.pathname === "/books" && req.method === "POST") {
    // CREATE
    handler.createBook(req, res);

  } else {
    handler.handleNotFound(req, res);
  }
});

server.listen(3000, () => {
  console.log("Server started at port 3000!");
});