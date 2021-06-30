import express from "express";
import cors from "cors";
import { routerReclamacao } from './controladores/Reclamacao/reclamacaoRota'
import { routerLogin } from './controladores/Login/loginRota'

import { ReclamacaoRepositorio } from "./persistencia/Reclamacao/reclamacaoRepositorio";
import { json } from 'body-parser';

const app = express();
import { connect } from "mongoose";
(async () => {
  try {
    app.set("port", 8080);
    app.use(cors());
    app.use(json());
    app.use(routerReclamacao);
    app.use(routerLogin)
    const dbAtlas =
      "mongodb+srv://tf:josealex@cluster0.zapmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    await connect(dbAtlas, { useNewUrlParser: true });
    app.listen(8080, () => {
      console.log("on: 8080");
    });
  } catch (e) {
    console.log(e);
  }
})();
