const express  = require("express");
const path = require('path');
const config = require("config")


const port = process.env.PORT || config.set("server.port");

const app = express();


app.set("port", port)


app.route('/extrato').get(
  (req, res) => {
    res.status(200).json(
      {'b': 'as'}
      )
  }
)



app.listen(port, () =>{
  console.log("RATO AGUADO")
})
console.log("Server Carapato")