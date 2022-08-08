const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const { query } = require("express");
const nodemailer = require("nodemailer");

const db = mysql.createPool({
  host: "novadirecao.mysql.dbaas.com.br",
  user: "novadirecao",
  password: "Novadirecao",
  database: "novadirecao",
});

app.use(cors());
app.use(express.json());

//adiciona vas ao banco de dados

app.post("/register", (req, res) => {
  const { nome } = req.body;
  const { salario } = req.body;
  const { local } = req.body;
  const { description } =req.body

  let SQL = "INSERT INTO vagas (nome, salario, local, description) VALUES ( ?,?,?,? )";
  db.query(SQL, [nome, salario, local, description], (err, result) => {
    console.log(err);
  });
});

app.post("/registerUrgente", (req, res) => {
  const { nome } = req.body;
  const { salario } = req.body;
  const { local } = req.body;
  const { description } =req.body

  let SQL = "INSERT INTO HotVagas (nome, salario, local, description) VALUES ( ?,?,?,? )";
  db.query(SQL, [nome, salario, local, description], (err, result) => {
    console.log(err);
  });
});

{
  /** mostra as vagas */
}

app.get("/getVagas", (req, res) => {
  let SQL = "SELECT * from vagas";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

{
  /** mostra as vagas importantes */
}

app.get("/getHotVagas", (req, res) => {
  let SQL = "SELECT * from HotVagas";

  db.query(SQL, (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

{
  /** edita valores */
}

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { nome } = req.body;
  const { salario } = req.body;
  const { local } = req.body;
  const { description } = req.body;

  let SQL = "UPDATE vagas SET nome = ? , salario = ?, local = ?, description = ?  WHERE  id = ?";

  db.query(SQL, [nome, salario, local, description, id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.put("/editUrgent", (req, res) => {
  const { id } = req.body;
  const { nome } = req.body;
  const { salario } = req.body;
  const { local } = req.body;
  const { description } = req.body;

  let SQL = "UPDATE HotVagas SET nome = ? , salario = ?, local = ?, description = ?  WHERE  id = ?";

  db.query(SQL, [nome, salario, local, description, id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

{
  /** deleta vagas */
}

app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let SQL = "DELETE FROM vagas WHERE id = ?";

  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

app.delete("/deleteUrgente/:id", (req, res) => {
  const { id } = req.params;

  let SQL = "DELETE FROM HotVagas WHERE id = ?";

  db.query(SQL, [id], (err, result) => {
    if (err) console.log(err);
    else res.send(result);
  });
});

{
  /** Configuracao inicial do servidor */
}

app.listen(process.env.PORT || 3333, () => {
  console.log("Server is Running!");
});
