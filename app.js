import express from "express";
import { drivers } from "./data.js";

const baseAPIRoute = "/api/v1";

const app = express();
// Endpoint da rota do navegador
// request e response sempre serao parametros da função app.get
app.get(baseAPIRoute + "/drivers", (request, resp) => {
  // informamos o status na resposta e enviamos com o send o json
  resp.status(200).send(drivers);
});

// Criando a porta local
const port = 3000;
// Escutando a porta local
app.listen(port, () => console.log("Rodando..."));
