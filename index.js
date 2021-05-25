const express  = require("express");
const path = require('path');
const config = require("config")
const pg = require("pg")
const jwt = require('jsonwebtoken')
const bodyParser = require("body-parser");
const uri = config.get("bd.uri")
const secret = config.get("jwt.secret")


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const pool = new pg.Pool({
  connectionString: uri,
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
    dropCreatTable += "CREATE TABLE lancamentos ( ";
    dropCreatTable += "nome varchar(50), "
    dropCreatTable += "sabor varchar(150), "
    dropCreatTable += "tamanho varchar(130), "
    dropCreatTable += "quantidade varchar(10) "
    dropCreatTable += ");";
    dropCreatTable += "DROP TABLE IF EXISTS usuarios; ";
    dropCreatTable += "CREATE TABLE usuarios (";
    dropCreatTable += "usuario varchar(50), "
    dropCreatTable += "senha varchar(255), "
    dropCreatTable += "perfil varchar(150), "
    dropCreatTable += "nome varchar(50) "
    dropCreatTable += ");"
    dropCreatTable += "INSERT INTO usuarios (usuario,senha,perfil,nome) "
    dropCreatTable += "VALUES ('admin', '123456', 'ADMIN', 'Lucas Macedo'); "

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


app.route('/login').post((req,res) =>{
  let qry = `SELECT * FROM usuarios WHERE usuario = '${req.body.usuario}'`
  qry += ` AND senha  = '${req.body.senha}'`
  pool.query(qry, (err, dbres) =>{
    if(err){
      res.status(500).send(err)
    } else {
      if(dbres.rowCount > 0){
        const row = dbres.rows[0]
        const payload = {
          usuario: row.usuario,
          perfil: row.perfil,
          nome: row.nome
        }
        const token = jwt.sign(payload, secret)
        const objToken = {token}
        res.status(200).json(objToken);
      } else {
        res.status(401).send("Usuario ou senha invalidos")
      }
    }
  })
});



app.listen(port, () =>{
  console.log("Servidor Iniciado")
})
