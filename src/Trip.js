import { Button, Card, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import { MapContainer, TileLayer, Marker, Tooltip, Popup } from "react-leaflet";
import L from "leaflet";

function Trip() {

  let { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleClick() {
    navigate("/trips");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://mighty-garden-03764.herokuapp.com/api/trips/${id}`, {
      method: 'PUT',
      body: JSON.stringify(trip),
    headers: {"Content-Type": "application/json"}
  })
  .then(function(response){
    return response.json()
    });
    navigate("/trips");
  };

  const handleChange = (e) => {
    let target = e.target; // the element that initiated the event
    let value = null; // its value
    let name = target.name; // its name

    if (target.type === "checkbox") {
      value = target.checked;
    } else if (target.type === "select-multiple") {
      value = [];
      for (let i = 0; i < target.options.length; i++) {
        if (target.options[i].selected) {
          value.push(target.options[i].value);
        }
      }
    } else {
      value = target.value;
    }

    setTrip((t) => {
      return { ...t, [name]: value };
    });
  };

  const mapStyles = {
    width: "100%",
    height: "400px",
  };

  const layer = L.tileLayer(
    `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }
  );

  useEffect(() => {
    setLoading(true);
    fetch(`https://mighty-garden-03764.herokuapp.com/api/trips/${id}`)
      .then((response) => response.json())
      .then(function (data) {
        setLoading(false);
        if (data.hasOwnProperty("_id")) {
          setTrip(data);

          let long = data["start station location"].coordinates[1];
          let lat = data["start station location"].coordinates[0];

          var map = L.map("map", {
            center: [long, lat],
            zoom: 13,
            layers: [layer],
          });

          L.marker([long, lat])
            .bindTooltip("Start: " + data["start station name"], {
              permanent: true,
              direction: "right",
            })
            .addTo(map);

          long = data["end station location"].coordinates[1];
          lat = data["end station location"].coordinates[0];

          L.marker([long, lat])
            .bindTooltip("End: " + data["end station name"], {
              permanent: true,
              direction: "right",
            })
            .addTo(map);
        } else {
          setTrip(null);
        }
      });
  }, [id]);

  if (loading) {
    return <Card>Loading Trip Data...</Card>;
  }
  if (trip) {
    return (
      <>
        <Card style={{ width: "100%" }}>
          <Card.Body>
            <Card.Title>
              Bike: {trip.bikeid} {trip.usertype}
            </Card.Title>
            <Card.Text>
              {trip["start station name"]} - {trip["end station name"]}
            </Card.Text>
          </Card.Body>
        </Card>

        <br />

        <div id="map" style={mapStyles} />
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Bike ID</Form.Label>
            <Form.Control
              type="number"
              name="bikeid"
              value={trip.bikeid}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Birth Year</Form.Label>
            <Form.Control
              type="number"
              name="birth year"
              value={trip["birth year"]}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Check
            type="radio"
            label="Subscriber"
            name="usertype"
            value="Subscriber"
            id="subscriber"
            checked={trip.usertype === "Subscriber"}
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="Customer"
            name="usertype"
            value="Customer"
            id="customer"
            checked={trip.usertype === "Customer"}
            onChange={handleChange}
          />
          <hr />
          <Link
            to="/Trips"
            className="btn btn-secondary float-right ml-1"
            onClick={handleClick}
          >
            Back to Trips
          </Link>
          <Button type="submit" className="float-right">
            Update Trip User
          </Button>
        </Form>
      </>
    );
  } else {
    return (
      <>
        <h3>Unable to find Trip with id: {id}</h3>
      </>
    );
  }
}

export default Trip;
