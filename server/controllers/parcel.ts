import * as moment from 'moment';
import * as request from 'request';

const RICHMOND_API_ENDPOINT = 'http://gis.richmondgov.com/ArcGIS/rest/services/WebMercator/Parcels/MapServer/2/query';

export default class WeatherCtrl {
  query = (req, res) => {

    // make request to Ricmond API
    const options = {
      uri: RICHMOND_API_ENDPOINT,
      qs: {
        // dont return extra info we dont really need
        geometry: req.longitude + ',' + req.latitude,
        geometryType: 'esriGeometryPoint',
        inSR: 4326,
        spatialRel: 'esriSpatialRelWithin',
        time: req.time,
        returnCountOnly: false,
        returnIdsOnly: false,
        returnGeometry: false,
        // these are the fields we want
        // See: http://gis.richmondgov.com/ArcGIS/rest/services/WebMercator/Parcels/MapServer/2 documentation if other fields are desired
        outFields: 'ParcelID,TotalValue,OwnerName,AssessmentDate,LandValue,DwellingValue,TotalValue,LandSqFt,LandUse',
        f: 'pjson',
      },
      json: true,
    };

    request(options, (err, response, body) => {
      if (err) {
        console.error(err);
        return res.status(500).send({ error: err });
      }

      return res.json(body.features);
    });
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
