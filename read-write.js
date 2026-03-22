const fs = require("fs");

function read() {
  const data = fs.readFileSync("data.json", "utf-8");
  return JSON.parse(data); // JSON -> JS object/array
}

function write(data) {
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2)); // JS -> JSON
}

module.exports = { read, write };