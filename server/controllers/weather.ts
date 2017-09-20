import * as moment from 'moment';
import * as request from 'request';

const DARK_SKY_ENDPOINT = 'https://api.darksky.net/forecast/';

export default class WeatherCtrl {
  query = (req, res) => {

    // make request to Dark sky api
    const options = {
      uri: DARK_SKY_ENDPOINT + req.apiKey + '/' + req.latitude + ',' + req.longitude + ',' + req.time,
      qs: {
        // dont return extra info we dont really need
        exclude: 'hourly,flags,minutely',
      },
      json: true,
    };

    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: err });
      }
      // Dark Sky will set body error on bad request
      if (body.error) {
        console.error(body.error);
        return res.status(500).send({ error: body.error });
      }

      return res.json(body);
    });
  }

  // checks and sets api key
  apiKey = (req, res, next) => {
    if (!process.env.DARK_SKY_API_KEY) {
      const err = 'DARK_SKY_API_KEY not set';
      console.error(err);
      return res.status(500).send({ error: err });
    }

    // set in request
    req.apiKey = process.env.DARK_SKY_API_KEY;
    next();
  }

  // validates and set latitude
  latitude = (req, res, next) => {
    if (!req.query.latitude) {
      const err = 'Invalid request. \'latitude\' queryParm required';
      console.error(err);
      return res.status(400).send({ error: err });
    }
    const latitude = Number(req.query.latitude);

    if (!latitude || latitude < -90 || latitude > 90) {
      const err = 'Invalid request. Invalid \'latitude\' queryParm';
      console.error(err);
      return res.status(400).send({ error: err });
    }

    // set in request
    req.latitude = latitude;
    next();
  }

  // validates and sets longitude
  longitude = (req, res, next) => {
    if (!req.query.longitude) {
      const err = 'Invalid request. \'longitude\' queryParm required';
      console.error(err);
      return res.status(400).send({ error: err });
    }
    const longitude = Number(req.query.longitude);

    if (!longitude || longitude < -180 || longitude > 180) {
      const err = 'Invalid request. Invalid \'longitude\' queryParm';
      console.error(err);
      return res.status(400).send({ error: err });
    }

    // set in request
    req.longitude = longitude;
    next();
  }

  // validates and sets time
  time = (req, res, next) => {
    if (!req.query.time) {
      const err = 'Invalid request. \'time\' queryParm required';
      console.error(err);
      return res.status(400).send({ error: err });
    }
    const time = moment(req.query.time, 'X');

    if (!time.isValid()) {
      const err = 'Invalid request. Invalid \'time\' queryParm';
      console.error(err);
      return res.status(400).send({ error: err });
    }

    // set in request
    req.time = time.unix();
    next();
  }
}
