import React, { useEffect, useState } from "react";
import "./level-designer.css";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Node } from "../../components/node/node";
import axios from "axios";

export const LevelDesigner = () => {
  const [width, setWidth] = useState<any>(5);
  const [height, setHeight] = useState<any>(5);
  const [selected, setSelected] = useState(0);

  const [selImg, setSelImg] = useState("");

  const [grid, setGrid] = useState<any>([]);
  const [portalCnt, setPortalCnt] = useState(0);
  const [playerPut, setPlayerPut] = useState(false);
  const [finishPut, setFinishPut] = useState(false);

  const [coord, setCoord] = useState<any>({});

  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");

  const saveLevel = async () => {
    const level = {
      title,
      description,
      width,
      height,
      levelMap: grid,
      creatorUsername: "TODO",
    };
    const resp = await axios.post(
      "http://localhost:31337/db/createMap/",
      { ...level },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidmlkcmFqb2tzaW0iLCJpYXQiOjE2ODA5ODkyNDB9.sjxVNqBWiPKSATbRuR8KCPtEwqrk6aLqk5uIdo44uDo",
        },
      }
    );

    console.log(resp);
  };

  const updateNode = (x: number, y: number) => {
    if ((selected === 1 && playerPut) || (selected === 4 && finishPut)) {
      return;
    }

    let portalCoords = undefined;

    const updatedGrid = grid.map((row: any, rowIndex: number) => {
      if (rowIndex === x) {
        return row.map((node: any, nodeIndex: number) => {
          if (nodeIndex === y) {
            if (selected === 1) {
              setPlayerPut(true);

              return {
                ...node,
                img: selImg,
                type: 2,
              };
            } else if (selected === 2) {
              if (portalCnt % 2 == 1) {
                // u sadasnji stavljamo prethodni
                portalCoords = {
                  coordX: coord.x,
                  coordY: coord.y,
                };

                setPortalCnt(portalCnt + 1);

                return {
                  ...node,
                  img: selImg,
                  portalCoordinate: coord.x * width + coord.y,
                  type: 3,
                };
              }

              setPortalCnt(portalCnt + 1);
              setCoord({ x, y });

              return {
                ...node,
                img: selImg,
                type: 3,
              };
            } else if (selected === 4) {
              setFinishPut(true);

              return {
                ...node,
                img: selImg,
                type: 4,
              };
            }
            return {
              ...node,
              img: selImg,
              type: 1,
            };
          }
          return node;
        });
      }
      return row;
    });

    if (portalCoords) {
      const { coordX, coordY } = portalCoords;
      grid[coordX][coordY].portalCoordinate = x * width + y;
    }

    console.log(updatedGrid);

    setGrid(updatedGrid);
  };

  const changeSelected = (idx: number, src: string) => {
    setSelected(idx);
    setSelImg(src);
  };

  const createNode = () => {
    return { img: "" };
  };

  const createGrid = (n: number, m: number) => {
    let newGrid = [];

    for (let i = 0; i < m; i++) {
      let newRow = [];
      for (let j = 0; j < n; j++) {
        newRow.push(createNode());
      }

      newGrid.push(newRow);
    }

    setGrid(newGrid);
  };

  const changeWidth = (wid: any) => {
    setWidth(wid);

    createGrid(wid, height);
  };

  const changeHeight = (h: any) => {
    setHeight(h);

    createGrid(width, h);
  };

  useEffect(() => {
    createGrid(width, height);
  }, []);

  return (
    <Container>
      <div className="d-flex mt-5">
        {/* left side */}
        <div className="d-block">
          {/* two selects */}
          <div className="d-flex justify-content-between dimension-select mb-5">
            <Form.Select
              className="w-50"
              style={{ marginRight: "20px" }}
              onChange={(evt) => changeWidth(evt.target.value)}
            >
              <option>Width</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
            </Form.Select>
            <Form.Select
              className="w-50"
              onChange={(evt) => changeHeight(evt.target.value)}
            >
              <option>Height</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </Form.Select>
          </div>
          {/* MAP */}
          <div
            className="editable-map"
            style={{
              backgroundImage: "url(/map-background.jpeg)",
            }}
          >
            {grid.map((row: any, rowIdx: number) => {
              return (
                <Row key={rowIdx}>
                  {row.map((node: any, nodeIdx: number) => {
                    return (
                      <Node
                        node={node}
                        key={nodeIdx}
                        onClick={() => updateNode(rowIdx, nodeIdx)}
                      />
                    );
                  })}
                </Row>
              );
            })}
          </div>

          <div className="d-flex justify-content-between mt-3 mb-5">
            <Button variant="success" onClick={() => saveLevel()}>
              Save
            </Button>
            <Button variant="danger" onClick={() => window.location.reload()}>
              Restart
            </Button>
          </div>
        </div>

        {/* COMPONENTS */}
        <div
          className={`d-block mt-5 ${portalCnt % 2 == 1 ? "disabled" : ""}`}
          style={{ marginLeft: "50px" }}
        >
          <h2>Components</h2>
          <div
            className={`d-block mt-5 ${portalCnt % 2 == 1 ? "disabled" : ""}`}
          >
            <div
              className={`entity mt-5 ${
                selected === 1 ? "selected-entity" : ""
              }`}
              onClick={() => changeSelected(1, "https://imagizer.imageshack.com/v2/255x220q70/r/922/8Y3PGq.png")}
            >
              <img src="player.svg" style={{ padding: "10px" }} />
              Player
            </div>
          </div>
          <div className="d-block">
            <div
              className={`entity ${selected === 2 ? "selected-entity" : ""}`}
              onClick={() => changeSelected(2, "https://imagizer.imageshack.com/v2/50x70q70/r/924/auGu9v.png")}
            >
              <img src="portal.png" style={{ padding: "10px" }} />
              Portal
            </div>
          </div>
          <div className="d-block">
            <div
              className={`entity ${selected === 3 ? "selected-entity" : ""}`}
              onClick={() => changeSelected(3, "https://imagizer.imageshack.com/v2/70x70q70/r/923/cls32T.png")}
            >
              <img src="obstacle.png" />
              Obstacle
            </div>
          </div>
          <div className="d-block">
            <div
              className={`entity ${selected === 4 ? "selected-entity" : ""}`}
              onClick={() => changeSelected(4, "https://imagizer.imageshack.com/v2/70x70q70/r/924/0q9G01.png")}
            >
              <img src="finish.png" style={{ padding: "10px" }} />
              Finish
            </div>
          </div>
        </div>
        <div className="d-block mt-5 w-25" style={{ marginLeft: "50px" }}>
          <Form.Group className="mb-3">
            <h3>Title</h3>
            <Form.Control
              type="text"
              placeholder="Title..."
              onChange={(evt) => {
                setTitle(evt.target.value);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <h3>Description</h3>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(evt) => {
                setDescription(evt.target.value);
              }}
            />
          </Form.Group>
        </div>
      </div>
    </Container>
  );
};