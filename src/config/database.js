const mongoose = require("mongoose");
//mongodb://127.0.0.1:27017 -> Default url para conexão com mangodb
//mongodb://127.0.0.1:27017/DatabaseNAme -> Após a url passamos o nome do database

//127.0.0.1: é melhor do que localhost pode evitar possiveis bugs de conexão.

const url = "mongodb://127.0.0.1:27017/todo";

mongoose.connect(url, { useNewUrlParser: true });
//{useNewUrlParser: true} -> Config passada para dizer ao node que queremos compatibilidade com outras versões do manodb.

module.exports = mongoose;
