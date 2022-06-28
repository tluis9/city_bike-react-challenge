# CityBike Test React (REACT)

### How to use

The backend is already configured and loaded on Heroku, the frontend is therefore already linked and has full backend functionality. To view the project, simply download the project and run the following script to configure the frontend.

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### About

This app is a query of where you can pick up bikes and where you need to relocate them. The back-end handles the data from the suggested API (http://api.citybik.es/v2/), being hosted on heroku, and the front was made using REACT.

The Live Demo of the Backend: https://mighty-garden-03764.herokuapp.com/api/trips?page=1&perPage=10
- - - -

Examples of API returns: `/api/trips/572bb8222b288919b68abf69` will return JSON data:

```
{
  "message": {
    "start station location": {
      "type": "Point",
      "coordinates": [
        -73.993915,
        40.746647
      ]
    },
    "end station location": {
      "type": "Point",
      "coordinates": [
        -73.97809472,
        40.736502
      ]
    },
    "_id": "572bb8222b288919b68abf69",
    "tripduration": 1245,
    "start station id": 442,
    "start station name": "W 27 St & 7 Ave",
    "end station id": 545,
    "end station name": "E 23 St & 1 Ave",
    "bikeid": 24071,
    "usertype": "Subscriber",
    "birth year": 1970,
    "start time": "2016-01-01T00:08:17.000Z",
    "stop time": "2016-01-01T00:29:03.000Z"
  }
}
```
- - - -
<pre>/api/trips?page=[NUMBER]&perPage=[NUMBER]</pre> 
- - - -
Returns a json message of the sample data by page and the amount per page. For example `/api/trips?page=1&perPage=10` will return page number 1 with 10 data points.


### How to perform the tests

### `npm test`

### How to build the project

### `npm build`
