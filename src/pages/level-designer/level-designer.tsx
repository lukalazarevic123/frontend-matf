import React, { useEffect, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import "./level-designer.css";
import { Button, Container, Form, Row } from "react-bootstrap";
import { Node } from "../../components/node/node";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LevelDesigner = () => {
  const navigate = useNavigate();

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

  const [debug, setDebug] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");

  const [hints, setHints] = useState<any>([]);
  const [hintText, setHint] = useState<any>({});

  const insertHint = () => {
    const newHints = [...hints, { hint: hintText }];

    setHints(newHints);
  };

  const saveLevel = async () => {
    // @ts-ignore
    const dbg = document.getElementById("our-check").checked;

    const level = {
      title,
      description,
      width,
      height,
      levelMap: grid,
      debugTask: dbg,
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

    const codeObj = {
      title: "Debugging problem",
      sourceCode: code,
      mapTitle: title,
      hints,
    };

    console.log(code);
    if (!dbg) return;
    const debugResp = await axios.post(
      "http://localhost:31337/db/addCode",
      { ...codeObj },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidmlkcmFqb2tzaW0iLCJpYXQiOjE2ODA5ODkyNDB9.sjxVNqBWiPKSATbRuR8KCPtEwqrk6aLqk5uIdo44uDo",
        },
      }
    );
    console.log(resp);
    navigate("/explore");
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
          <h2 style={{ marginTop: "0px" }}>Components</h2>
          <div
            className={`d-block mt-5 ${portalCnt % 2 == 1 ? "disabled" : ""}`}
          >
            <div
              className={`entity mt-5 ${
                selected === 1 ? "selected-entity" : ""
              }`}
              onClick={() =>
                changeSelected(
                  1,
                  "https://imagizer.imageshack.com/v2/255x220q70/r/922/8Y3PGq.png"
                )
              }
            >
              <img src="player.svg" style={{ padding: "10px" }} />
              Player
            </div>
          </div>
          <div className="d-block">
            <div
              className={`entity ${selected === 2 ? "selected-entity" : ""}`}
              onClick={() =>
                changeSelected(
                  2,
                  "https://imagizer.imageshack.com/v2/50x70q70/r/924/auGu9v.png"
                )
              }
            >
              <img src="portal.png" style={{ padding: "10px" }} />
              Portal
            </div>
          </div>
          <div className="d-block">
            <div
              className={`entity ${selected === 3 ? "selected-entity" : ""}`}
              onClick={() =>
                changeSelected(
                  3,
                  "https://imagizer.imageshack.com/v2/70x70q70/r/923/cls32T.png"
                )
              }
            >
              <img src="obstacle.png" />
              Obstacle
            </div>
          </div>
          <div className="d-block">
            <div
              className={`entity ${selected === 4 ? "selected-entity" : ""}`}
              onClick={() =>
                changeSelected(
                  4,
                  "https://imagizer.imageshack.com/v2/70x70q70/r/924/0q9G01.png"
                )
              }
            >
              <img src="finish.png" style={{ padding: "10px" }} />
              Finish
            </div>

            <div className="hint-factory">
              <div className="d-flex justify-content-between">
                <textarea
                  className="w-75"
                  rows={3}
                  onChange={(evt) => {
                    setHint(evt.target.value);
                  }}
                ></textarea>
                <Button variant="success" className="h-25" onClick={() => insertHint()}>
                  Add
                </Button>
              </div>
              {hints.map((ht:any, idx:number) =>(
                  <li className="mt-2 mb-2">
                    {ht.hint}
                  </li>
                ))}
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

          <Form.Group className="mb-3 mt-5">
            <h3>Debugging problem?</h3>
            <Form.Check
              id="our-check"
              type="checkbox"
              onChange={(evt) => {
                setDebug(evt.target.checked);
              }}
            />
          </Form.Group>
          <div className="mt-5 mb-5" hidden={!debug}>
            <CodeEditor
              value={code}
              language="js"
              placeholder="Please enter JS code."
              onChange={(evn) => setCode(evn.target.value)}
              style={{
                width: "500px",
                height: "730px",
                fontSize: 15,
                backgroundColor: "#000000",
                fontFamily:
                  "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};
