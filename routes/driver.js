import express from "express";
import { updateDriverSchema, driverSchema } from "../inputValidation.js";
import { drivers, sortPoints } from "../data.js";
import { randomUUID } from "node:crypto";

// objeto que lida com rotas do express
const router = express.Router();

// Endpoint da rota do navegador
// request e response sempre serao parametros da função router.get
router.get("/", (request, resp) => {
  // informamos o status na resposta e enviamos com o send o json
  resp.status(200).send(drivers);
});

// o :position é um parametro de rota, que nada mais é que uma variavel com o parametro da url
router.get("/standings/:position", (request, resp) => {
  // a request tem o campo .params, que por sua vez pode usar o nome do parametro :position
  const { position } = request.params;
  if (position > drivers.length || position <= 0) {
    resp.status(400).send("Posição inválida!");
    return;
  }
  const selectedDriver = drivers[position - 1];
  resp.status(200).send(selectedDriver);
});

// igual o de cima mas com id
router.get("/:id", (request, resp) => {
  const { id } = request.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);
  if (!selectedDriver) {
    resp.status(404).send("Não existe um piloto com esse id!");
    return;
  }
  resp.status(200).send(selectedDriver);
});

// usando o post
router.post("/", (request, resp) => {
  const { error } = driverSchema.validate(request.body, { abortEarly: false });

  if (error) {
    resp.status(400).send(error);
    return;
  }
  const newDriver = { ...request.body, id: randomUUID() };

  drivers.push(newDriver);
  sortPoints(drivers);
  resp.status(200).send(newDriver);
});

// put
router.put("/:id", (request, resp) => {
  const { error } = updateDriverSchema.validate(request.body, {
    abortEarly: false,
  });

  if (error) {
    resp.status(400).send(error);
    return;
  }
  const { id } = request.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);

  if (!selectedDriver) {
    resp.status(404).send("Não existe um piloto com esse id!");
    return;
  }

  for (const key in selectedDriver) {
    if (request.body[key]) {
      selectedDriver[key] = request.body[key];
    }
  }
  sortPoints(drivers);

  resp.status(200).send(selectedDriver);
});

// delete
router.delete("/:id", (request, resp) => {
  const { id } = request.params;
  const selectedDriver = drivers.find((driver) => driver.id === id);

  if (!selectedDriver) {
    resp.status(404).send("Não existe um piloto com esse id!");
    return;
  }
  // indexOf pega o indice do objeto no array
  const index = drivers.indexOf(selectedDriver);
  // splice irá retirar o objeto do array a partir do indice informado
  // sendo array.splice(indiceInicial, quantosObjetosAPartir)
  drivers.splice(index, 1);

  resp.status(200).send(selectedDriver);
});

export default router;
