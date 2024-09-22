import express from "express";
import driversRouter from "./routes/driver.js";
import teamsRouter from "./routes/team.js";

const baseAPIRoute = "/api/v1";
const app = express();

// Em metodos posts, o json vem de maneira codificada para o backend
// para contornar precisamos do express.json() dentro de um app.use()
app.use(express.json());

// Buscando as rotas
app.use(baseAPIRoute + "/drivers", driversRouter); // driversRouter é o export padrao do router do arquivo driver.js
app.use(baseAPIRoute + "/teams", teamsRouter); // driversRouter é o export padrao do router do arquivo driver.js

// Criando a porta local
const port = 3000;
// Escutando a porta local
app.listen(port, () => console.log("Rodando..."));
