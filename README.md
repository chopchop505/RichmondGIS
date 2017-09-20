# Richmond GIS [![MIT license](http://img.shields.io/badge/license-MIT-lightgrey.svg)](http://opensource.org/licenses/MIT)

## Stack Overview
This project was based on generated scaffolding provided by: [Angular-Full-Stack](https://github.com/DavideViolante/Angular-Full-Stack).  

This project uses the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle):
* [**M**ongoose.js](http://www.mongoosejs.com) ([MongoDB](https://www.mongodb.com)): database
* [**E**xpress.js](http://expressjs.com): backend framework
* [**A**ngular 2+](https://angular.io): frontend framework
* [**N**ode.js](https://nodejs.org): runtime environment

## Prerequisites
1. Install [Node.js](https://nodejs.org) (v6.11.3) and [MongoDB](https://www.mongodb.com) (3.2.4)
2. Install Angular CLI: `npm i -g @angular/cli`
3. Register & obtain an api key from [Dark Sky](https://darksky.net/dev/register)
4. From project root folder install all the dependencies: `npm i`
5. Copy all incident JSON files to ./data directory
6. Load data into MongoDB with utility script. Note: This will also delete any existing data before inserting: `./bin/loadData`

## Run
### Development mode
`DARK_SKY_API_KEY=<KEY> npm run dev`: [concurrently](https://github.com/kimmobrunfeldt/concurrently) execute MongoDB, Angular build, TypeScript compiler and Express server.

A window will automatically open at [localhost:4200](http://localhost:4200). Angular and Express files are being watched. Any change automatically creates a new bundle, restart Express server and reload your browser.

## Known Issues
* Investigate discrepancy in time variable. The 'time' variable displaced in Weather card does not match the Event date to the same hour.  Likely a timezone issue.

## To do
The project meets the current requirements, but theres always room for improvement:
* Backend & Frontend Unit tests
* Documentation
* Enrich further by illustrate timeline of 'apparatus' response
* Add ability to add incident data from frontend or interface to import from source

## Hours
I've logged approximately 7 hours on this project.
A large portion of the time was actually experimenting and researching weather APIs that provide historical data.  I still have very more I would like to do, but for the fairness to other applicants, I will not update the repo until reviewd.

## Screenshots
### Home
![Alt text](/screenshots/home.png?raw=true "Home")

### Incidents
![Alt text](/screenshots/incidents.png?raw=true "Incidents")

### Enrichments
![Alt text](/screenshots/enrichments.png?raw=true "Enrichments")
