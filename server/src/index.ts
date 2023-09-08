import { App } from "./app";
require("dotenv").config();

function main() {
  const app = new App();
  app.listen();
}

main();
