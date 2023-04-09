import React, { useState, useEffect } from "react";
import axios from "axios";
import "./all-levels.css";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const AllLevels = () => {
  const navigate = useNavigate();
  const [maps, setMaps] = useState<any>([]);

  const [titleSrc, setTitleSrc] = useState<any>("");
  const [sort, setSort] = useState(false);


  useEffect(() => {
    const fetchMaps = async () => {
      const resp = await axios.get("http://localhost:31337/db/getMaps");
      console.log(resp.data);

      setMaps(resp.data);
    };

    fetchMaps();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col sm={4}>
          <div className="filter-bar">
            <h2>Filter search</h2>

            <Form.Group className="mb-3 mt-5">
              <h3>Filter by title</h3>
              <Form.Control
                type="text"
                placeholder="Title..."
                onChange={(evt) => {
                  setTitleSrc(evt.target.value);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3 mt-5">
              <h3>Sort by complicity rating</h3>
              <Form.Check
                type="checkbox"
                onChange={(evt) => setSort(evt.target.checked)}
              />
            </Form.Group>
          </div>
        </Col>
        <Col sm={8}>
          <Row>
            {maps
              .filter((map: any) => {
                if (map.title.startsWith(titleSrc)) {
                  return map;
                }
              })
              .sort((map1: any, map2: any) => {
                if (sort) {
                  return map2.complicityRating - map1.complicityRating;
                } else {
                  return;
                }
              })
              .map((map: any, mapIdx: number) => (
                <Col key={mapIdx} onClick={() => navigate(`/level/${map.title}`)}>
                  <Card className="map-card mb-5" style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src="map-background.jpeg"
                      className="card-img"
                    />
                    <Card.Body>
                      <Card.Title>{map.title}</Card.Title>
                    </Card.Body>
                    <Card.Text className="text-secondary">
                      {map.description.slice(0, 50) + "...."}
                    </Card.Text>
                    <Card.Footer className="justify-content-between">
                      <Button
                        variant="warning"
                        style={{ marginRight: "100px" }}
                        disabled
                      >
                        Rating {map.complicityRating}
                      </Button>
                      <Button variant="danger">Play</Button>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};
