import express from "express";
import { drivers, sortDrivers } from "./data.js";
import { randomUUID } from "node:crypto";

const baseAPIRoute = "/api/v1";
const app = express();

// Em metodos posts, o json vem de maneira codigica para o backend
// para contornar precisamos do express.json() dentro de um app.use()
app.use(express.json());

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

// usando o post
app.post(baseAPIRoute + "/drivers", (request, resp) => {
  const newDriver = { ...request.body, id: randomUUID() };
  drivers.push(newDriver);
  sortDrivers(drivers);
  resp.status(200).send(newDriver);
});

app.put(baseAPIRoute + "/drivers/:id", (request, resp) => {
  const { id } = request.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);

  for (const key in selectedDriver) {
    if (request.body[key]) {
      selectedDriver[key] = request.body[key];
    }
  }
  sortDrivers(drivers);

  resp.status(200).send(selectedDriver);
});

app.delete(baseAPIRoute + "/drivers/:id", (request, resp) => {
  const { id } = request.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);
  // indexOf pega o indice do objeto no array
  const index = drivers.indexOf(selectedDriver);
  // splice irá retirar o objeto do array a partir do indice informado
  // sendo array.splice(indiceInicial, quantosObjetosAPartir)
  drivers.splice(index, 1);

  resp.status(200).send(selectedDriver);
});

// Criando a porta local
const port = 3000;
// Escutando a porta local
app.listen(port, () => console.log("Rodando..."));
