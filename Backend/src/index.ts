import express from "express";
import app from './app'
import { connect } from "mongoose";
import { ReclamacaoRepositorio } from './persistencia/Reclamacao/reclamacaoRepositorio';
(async () => {
  try {
    const dbAtlas = "mongodb+srv://tf:josealex@cluster0.zapmq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    await connect(dbAtlas, { useNewUrlParser: true });
    app.listen(8080, () => {
      console.log("on: 8080");
    });
  } catch (e) {
    console.log(e);
  }
})();
