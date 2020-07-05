const routes = require('express').Router();

const ClientController = require('./app/controllers/ClientController');

routes.get('/clients', ClientController.index);
routes.get('/clients/:email', ClientController.show);
routes.post('/clients', ClientController.store);
routes.put('/clients/:email', ClientController.update);
routes.delete('/clients/:email', ClientController.destroy);

routes.get('/', (req, res) => {
  return res.status(200).send();
});

module.exports = routes;
