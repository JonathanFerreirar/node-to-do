const mongoose = require("../config/database");

const Schema = mongoose.Schema; // Determina as informações que vamos armazenar

const TaskSchema = new Schema({
  macaddress: { type: String, required: true }, //mascaddress é um identificador unico de aparelho similiar a um endereço ip
  type: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  when: { type: Date, required: true },
  done: { type: Boolean, default: false },
  created: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Task", TaskSchema);
