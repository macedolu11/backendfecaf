const express  = require("express");
const path = require('path');
const config = require("config")
const pg = require("pg")

const pool = new pg.Pool({
  connectionString: 'postgres://prkdhhgasrebsu:0481eb0c3ca0e5831799027422f761b66b307da385ab3fabc98f5bc32c3f946a@ec2-54-196-33-23.compute-1.amazonaws.com:5432/d8spculdfeicsn',
  ssl:{
    rejectUnauthorized: false
  }
})

app.route('/reset').get(
  (req, res) => {
    let dropCreatTable = "";
    dropCreatTable += "DROP TABLE IF EXISTS lancamentos; ";
    dropCreatTable += "CREATE TABLE lancamentos(";
    dropCreatTable += "nome char(50), "
    dropCreatTable += "sabor char(150), "
    dropCreatTable += "tamanho char(130), "
    dropCreatTable += "quantidade char(10) "
    dropCreatTable += ");";

    pool.query(dropCreatTable, (err, dbres) => {
      console.log("Error: " + err)
      console.log(dbres)
      res.status(200).send("RESET!")
    })
  })


const port = process.env.PORT || config.get("server.port");

const app = express();


app.set("port", port)
const lancamentos = [
  {
    nome: "LUCAS",
    sabor: "Portuguesa",
    tamanho: "5",
    quantidade: 1
  },
  {
    nome: "LUCAS",
    sabor: "Portuguesa",
    tamanho: "5",
    quantidade: 1
  },
  {
    nome: "LUCAS",
    sabor: "Portuguesa",
    tamanho: "5",
    quantidade: 1
  }
]

app.route('/extrato').get( 
  (req, res) => {
    res.status(200).json(
        lancamentos
      )
  }
)


app.route('/lancamento').get(
  (req, res) => {
    res.status(200).send("LANÇAMENTO")
  }
)



app.listen(port, () =>{
  console.log("Servidor Iniciado")
})
