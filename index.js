const express  = require("express");
const path = require('path');
const config = require("config")
const pg = require("pg")
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const pool = new pg.Pool({
  connectionString: 'postgres://prkdhhgasrebsu:0481eb0c3ca0e5831799027422f761b66b307da385ab3fabc98f5bc32c3f946a@ec2-54-196-33-23.compute-1.amazonaws.com:5432/d8spculdfeicsn',
  ssl:{
    rejectUnauthorized: false
  }
})



const port = process.env.PORT || config.get("server.port");




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
    });
  });

app.route('/extrato').get(
  (req, res) => {
    let querySelectAll = "SELECT * from lancamentos"
    pool.query(querySelectAll, (err, dbres) => {
      console.log("Error: " + err)
      res.status(200).json(dbres.rows)
    });

  })



app.route('/lancamento').post(
  (req, res) => {
    let queryInset = "INSERT INTO lancamentos (nome,sabor,tamanho,quantidade) VALUES "
    queryInset += `('${req.body.nome}', '${req.body.sabor}', '${req.body.tamanho}', '${req.body.quantidade}');`;
    console.log(queryInset)
    pool.query(queryInset, (err, dbres) => {
      res.status(200).send("OK")
    });
    
  }
)



app.listen(port, () =>{
  console.log("Servidor Iniciado")
})
