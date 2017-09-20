import * as mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
  address: {
    address_id: String,
    address_line1: String,
    city: String,
    common_place_name: String,
    cross_street1: String,
    cross_street2: String,
    first_due: String,
    geohash: String,
    latitude: Number,
    longitude: Number,
    name: String,
    number: String,
    postal_code: String,
    prefix_direction: String,
    reponse_zone: String,
    state: String,
    suffix_direction: String,
    // escape because 'type' is reserved
    _type: String,
  },
  apparatus: [{
    car_id: String,
    extended_data: {
      event_duration: Number,
      response_duration: Number,
      travel_duration: Number,
      turnout_duration: Number,
    },
    geohash: String,
    personnel: [],
    shift: String,
    station: String,
    unit_id: String,
    unit_status: {
      acknowledged: {
        geohash: String,
        latitude: Number,
        longitude: Number,
        timestamp: Date,
      },
      arrived: {
        geohash: String,
        latitude: Number,
        longitude: Number,
        timestamp: Date,
      },
      available: {
        geohash: String,
        latitude: Number,
        longitude: Number,
        timestamp: Date,
      },
      cleared: {
        geohash: String,
        latitude: Number,
        longitude: Number,
        timestamp: Date,
      },
      dispatched: {
        geohash: String,
        latitude: Number,
        longitude: Number,
        timestamp: Date,
      },
      enroute: {
        geohash: String,
        latitude: Number,
        longitude: Number,
        timestamp: Date,
      },
      '~': {
        geohash: String,
        latitude: Number,
        longitude: Number,
        timestamp: Date,
      }
    }
  }],
  unit_type: String,
  description: {
    comments: String,
    day_of_week: String,
    event_closed: Date,
    event_id: String,
    event_opened: Date,
    extended_data: {
      dispatch_duration: Number,
      event_duration: Number,
      response_time: Number,
    },
    first_unit_arrived: Date,
    first_unit_dispatched: Date,
    first_unit_enroute: Date,
    hour_of_day: Number,
    incident_number: {
      type: String,
      unique: true,
      index: true,
    },
    loi_search_complete: Date,
    subtype: String,
    // esecape because type is reserved
    _type: String,
  },
  fire_department: {
    fd_id: String,
    firecares_id: String,
    name: String,
    shift: String,
    state: String,
    timezone: String,
  },
  version: String,
});

const Incident = mongoose.model('Incident', incidentSchema);

export default Incident;
