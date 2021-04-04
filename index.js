const express  = require("express");
const path = require('path');
const config = require("config")


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
    res.status(200).write("LANÇAMENTO")
  }
)



app.listen(port, () =>{
  console.log("Servidor Iniciado")
})
