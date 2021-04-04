const express  = require("express");
const path = require('path');
const config = require("config")


const port = process.env.PORT || config.get("server.port");

const app = express();


app.set("port", port)
const lancamentos = [
  {
    data: '2021-03-10',
    descricao: 'pagamento',
    valor: 2500.00
  },
  {
    data: '2021-03-15',
    descricao: 'mercado',
    valor: 2500.00
  },
  {
    data: '2021-03-30',
    descricao: 'pagamento',
    valor: 2500.00
  }
]

app.route('/extrato').get(
  (req, res) => {
    res.status(200).json(
        lancamentos
      )
  }
)



app.listen(port, () =>{
  console.log("RATO AGUADO")
})
console.log("Server Carapato")