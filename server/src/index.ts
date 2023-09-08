import { App } from "./app";
require("dotenv").config();
require("express-async-errors");

function main() {
  const app = new App();
  app.listen();
}

main();
