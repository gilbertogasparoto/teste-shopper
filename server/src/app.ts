import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import routes from "./routes/index.routes";
import cors from "cors";

export class App {
  private app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings() {
    this.app.set("port", this.port || process.env.PORT || 3000);
    this.app.use(cors());
    this.app.use(express.json());
  }

  middlewares() {
    this.app.use(morgan("dev"));
  }

  routes() {
    this.app.use(routes);
  }

  listen() {
    this.app.listen(this.app.get("port"), () =>
      console.log(`Servidor rodando na porta ${this.app.get("port")}`)
    );
  }
}
