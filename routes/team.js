import express from "express";
import { generateTeams } from "../data.js";

// objeto que lida com rotas do express
const router = express.Router();

router.get("/", (request, resp) => {
  const teams = generateTeams();
  resp.status(200).send(teams);
});

router.get("/standings/:position", (request, resp) => {
  // a request tem o campo .params, que por sua vez pode usar o nome do parametro :position
  const teams = generateTeams();
  const { position } = request.params;
  if (position > teams.length || position <= 0) {
    resp.status(400).send("Posição inválida!");
    return;
  }
  const selectedTeam = teams[position - 1];
  resp.status(200).send(selectedTeam);
});

export default router;
