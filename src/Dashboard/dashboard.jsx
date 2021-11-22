import { React,useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Container, Card, Row } from "react-bootstrap";
import "../Dashboard/dash.css";
export default function Dashboard() {

  const [data, setData] = useState({});

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const headers = { "Content-Type": "application/json" };

    const endpoint = "http://localhost:5050/api";

    axios
      .get(endpoint, { headers })
      .then((response) => {
        setData({
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(data)
  return (
    <Container fluid>
      <section>
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 360 }}
        >
          <Row>
            <div className="col-lg-3 col-sm-6">
              <Card bg="success" border="success" text="white" className="mb-2">
                <Card.Header>Total Subjects</Card.Header>
                <Card.Body>
                  <Card.Title>12</Card.Title>
                  <Card.Text>System Subject</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="light" border="light" text="dark" className="mb-2">
                <Card.Header># of Send Emails</Card.Header>
                <Card.Body>
                  <Card.Title>1110</Card.Title>
                  <Card.Text>System Emails</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            <div className="col-lg-3 col-sm-6">
              <Card bg="info" border="info" text="light" className="mb-2">
                <Card.Header>Total </Card.Header>
                <Card.Body>
                  <Card.Title>12</Card.Title>
                  <Card.Text>System Subject</Card.Text>
                </Card.Body>
                <Card.Footer>View More</Card.Footer>
              </Card>
            </div>
            
          </Row>
          
        </div>
      </section>
    </Container>
  );
}
