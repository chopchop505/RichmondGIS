import * as express from 'express';

import IncidentCtrl from './controllers/incident';
import WeatherCtrl from './controllers/weather';

import UserCtrl from './controllers/user';

import Incident from './models/incident';
import User from './models/user';

export default function setRoutes(app) {

  const router = express.Router();

  const incidentCtrl = new IncidentCtrl();

  const userCtrl = new UserCtrl();
  const weatherCtrl = new WeatherCtrl();

  // Incident
  router.route('/incidents').get(incidentCtrl.getAll);

  // Weather
  router.route('/weather').get(weatherCtrl.apiKey, weatherCtrl.latitude, weatherCtrl.longitude, weatherCtrl.time, weatherCtrl.query);

  // Users
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
