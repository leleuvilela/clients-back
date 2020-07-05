const Client = require('../schemas/Client');

class SessionController {
  async index(req, res) {
    try {
      const clients = await Client.find({});
      return res.json(clients);
    } catch (e) {
      return res.status(500).json('Error ao listar clientes');
    }
  }

  async show(req, res) {
    const { email } = req.params;

    try {
      const client = await Client.find({ email });
      if (client.length) return res.json(client);
      else return res.status(404).send();
    } catch (e) {
      return res
        .status(500)
        .json({ error: { message: 'Erro ao pesquisar usuário ' } });
    }
  }

  async store(req, res) {
    const { email, name, cpf, phone } = req.body;

    try {
      const client = await Client.create({ email, name, cpf, phone });
      return res.json(client);
    } catch (e) {
      return res
        .status(401)
        .json({ error: { message: 'Email já cadastrado' } });
    }
  }

  async update(req, res) {
    const { email } = req.params;
    try {
      const data = req.body;

      const client = await Client.findOneAndUpdate({ email }, data, {
        new: true,
      });
      if (client) return res.json(client);
      else return res.status(404).send();
    } catch (e) {
      return res
        .status(500)
        .json({ error: { message: 'Erro ao atualizar usuário ' } });
    }
  }

  async destroy(req, res) {
    const { email } = req.params;
    try {
      await Client.deleteOne({ email });
      return res.json();
    } catch (e) {
      return res
        .status(500)
        .json({ error: { message: 'Erro ao deletar usuário ' } });
    }
  }
}

module.exports = new SessionController();
