import cors from "cors";
import { routerReclamacao } from './controladores/Reclamacao/reclamacaoRota'
import { routerLogin } from './controladores/Login/loginRota'
import express, { Router } from 'express';
import { json } from 'body-parser';
const app = express();

app.set("port", 8080);
app.use(cors());
app.use(json());
app.use(routerReclamacao);
app.use(routerLogin);

export default app;