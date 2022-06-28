import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Card, Badge, Pagination, Table } from "react-bootstrap";

function Trips() {
  const perPage = 10;
  const [page, setPage] = useState(1);
  const [trip, setTrip] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch (
      `https://mighty-garden-03764.herokuapp.com/api/trips?page=${page}&perPage=${perPage}`
    ).then(res => res.json()).then(result => setTrip(result))
    .catch((error) => {
      alert("Error: " + error);
    });
  }, [page]);

 if (!trip) {
    return <p>Loading Trips...</p>;
 }
  return (
    <>
      <Card style={{ width: "100%" }}>
        <Card.Body>
          <Card.Title>Trip List</Card.Title>
          <Card.Text>Full list of Citibike Trips.</Card.Text>
          <div className="float-right">
            <div class="sub">
            <Badge>Subscribers</Badge>{' '}
            </div>
            <div class="cus">
            <Badge>Customers</Badge>{' '}
            </div>
          </div>
        </Card.Body>
      </Card>

      <br/>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Bike ID</th>
            <th>Start Station</th>
            <th>End Station</th>
            <th>Duration (Minutes)</th>
          </tr>
        </thead>
        <tbody>
        {trip.map(t => (
          <tr onClick={()=>{ navigate(`/trip/${t._id}`)}} class={t.usertype}>
            <td>{t.bikeid}</td>
            <td>{t["start station name"]}</td>
            <td>{t["end station name"]}</td>
            <td>{(t.tripduration / 60).toFixed(2)}</td>
          </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={previousPage}/> 
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={nextPage}/>
      </Pagination>
    </>
  );

  function previousPage() {
    if (page > 1) setPage((currPage) => currPage - 1);
  }
  function nextPage() {
    setPage((currPage) => currPage + 1);
  }
}

export default Trips;
