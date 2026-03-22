const fs = require("fs/promises");

const handleWelcome = (req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  res.end("Welcome!");
};

const handleNotFound = (req, res) => {
  res.writeHead(404, { "content-type": "text/plain" });
  res.end("Not found");
};

const handlePerson = (req, res, query) => {
  const namePattern = /^[A-Z][a-z]+$/;
  const embgPattern = /^\d{17}$/;

  if (
    namePattern.test(query.ime) &&
    namePattern.test(query.prezime) &&
    embgPattern.test(query.embg)
  ) {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(`Hello ${query.ime} ${query.prezime}`);
  } else {
    res.writeHead(400, { "content-type": "text/plain" });
    res.end("Invalid input");
  }
};

const getAllBooks = async (req, res) => {
  try {
    const data = await fs.readFile("books.json", "utf-8");
    const books = JSON.parse(data);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(books));
  } catch (err) {
    res.writeHead(500, { "content-type": "text/plain" });
    res.end("Error reading books");
  }
};

const createBook = async (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", async () => {
    try {
      const newBook = JSON.parse(body);

      const data = await fs.readFile("books.json", "utf-8");
      const books = JSON.parse(data);

      books.push(newBook);

      await fs.writeFile("books.json", JSON.stringify(books));

      res.writeHead(201, { "content-type": "text/plain" });
      res.end("Book added!");
    } catch (err) {
      res.writeHead(400, { "content-type": "text/plain" });
      res.end("Invalid data");
    }
  });
};


module.exports = {
  handleWelcome,
  handleNotFound,
  handlePerson,
  getAllBooks,
  createBook,
};
