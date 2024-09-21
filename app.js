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

// o :position é um parametro de rota, que nada mais é que uma variavel com o parametro da url
app.get(baseAPIRoute + "/drivers/standings/:position", (request, resp) => {
  // a request tem o campo .params, que por sua vez pode usar o nome do parametro :position
  const { position } = request.params;
  const selectedDriver = drivers[position - 1];
  resp.status(200).send(selectedDriver);
});

// igual o de cima mas com id
app.get(baseAPIRoute + "/drivers/:id", (request, resp) => {
  const { id } = request.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);
  resp.status(200).send(selectedDriver);
});

// Criando a porta local
const port = 3000;
// Escutando a porta local
app.listen(port, () => console.log("Rodando..."));
