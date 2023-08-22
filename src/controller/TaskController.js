const {
  startOfDay,
  startOfWeek,
  endOfDay,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require("date-fns");
const TaskModel = require("../model/TaskModel");

const current = new Date();
class TaskController {
  async create(req, res) {
    const task = new TaskModel(req.body);
    await task
      .save()
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async update(req, res) {
    await TaskModel.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true, //Pasando esse parametro na resposta da promise ele retorna o valor atualizado
    })
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }

  async all(req, res) {
    await TaskModel.find({ macaddress: { $in: req.params.macaddress } })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async show(req, res) {
    await TaskModel.findById(req.params.id)
      .then((response) => {
        if (response) {
          return res.status(200).json(response);
        } else {
          return res.status(404).json({ error: "Tarefa não encontrada." });
        }
      })
      .catch((error) => res.status(500).json(error));
  }

  async delete(req, res) {
    await TaskModel.deleteOne({ _id: req.params.id })
      .then((response) => {
        response;
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(200).json(error);
      });
  }

  async done(req, res) {
    await TaskModel.findByIdAndUpdate(
      { _id: req.params.id },
      { done: req.params.done },
      { new: true }
    )
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async late(req, res) {
    await TaskModel.find({
      when: { $lt: current }, //$lt -> Last then - menor do que -> Dessa simples maneira estou fazendo uma logica para filtras data menores que a atual
      macaddress: { $in: req.params.macaddress },
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(500).json(error);
      });
  }

  async today(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfDay(current), $lte: endOfDay(current) }, // $gte -> Great the equels   $lte -> Less then equal
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }

  async week(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfWeek(current), $lte: endOfWeek(current) }, // $gte -> Great the equels   $lte -> Less then equal
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }

  async month(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfMonth(current), $lte: endOfMonth(current) }, // $gte -> Great the equels   $lte -> Less then equal
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }

  async year(req, res) {
    await TaskModel.find({
      macaddress: { $in: req.params.macaddress },
      when: { $gte: startOfYear(current), $lte: endOfYear(current) }, // $gte -> Great the equels   $lte -> Less then equal
    })
      .sort("when")
      .then((response) => {
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res.status(400).json(error);
      });
  }
}

module.exports = new TaskController();
