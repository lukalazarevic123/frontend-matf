import React, { useEffect, useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Button, Container, Spinner } from "react-bootstrap";
import Row from "react-bootstrap/esm/Row";
import Form from "react-bootstrap/esm/Form";
import { Node } from "../../components/node/node";
import "./level-view.css";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

interface ILevel {
  width: number;
  height: number;
  rating: number;
  levelMap: any;
  title: string;
  description: string;
}

export const LevelView = () => {
  const [levelData, setLevelData] = useState<ILevel>({
    width: 10,
    height: 10,
    levelMap: [
      [
        {
          type: "player",
          img: "player.svg",
        },
        { type: "portal", img: "portal.png" },
        { type: "obstacle", img: "obstacle.png" },
        { type: "portal", img: "portal.png" },
        { type: "obstacle", img: "obstacle.png" },
        { type: "portal", img: "portal.png" },
        { type: "obstacle", img: "obstacle.png" },
        { type: "portal", img: "portal.png" },
        { type: "obstacle", img: "obstacle.png" },
        { type: "portal", img: "portal.png" },
      ],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    ],
    rating: 5,
    title: "Dynamic programming",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  });

  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { title } = useParams();

  useEffect(() => {
    const fetchLevel = async () => {
      const resp = await axios.get(
        `http://localhost:31337/db/getMap/${title}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidmlkcmFqb2tzaW0iLCJpYXQiOjE2ODA5ODkyNDB9.sjxVNqBWiPKSATbRuR8KCPtEwqrk6aLqk5uIdo44uDo",
          },
        }
      );
      console.log(resp.data);
      setLevelData(resp.data);
    };

    fetchLevel();
  }, []);

  const submitCode = async () => {
    if (code === "") {
      alert("Can't submit this");
      return;
    }

    const req = await axios.post("http://localhost:31337/game/check", {
      source: code,
      title,
    });

    if (req.data.error) {
      //open modal
    }

    setLoading(true);

    simulateMoves(req.data.commandList);

    setLoading(false)
  };

  const findPlayer = () => {
    for (let i = 0; i < levelData.levelMap.length; i++) {
      for (let j = 0; j < levelData.levelMap[i].length; j++) {
        if (levelData.levelMap[i][j].type == 2) {
          return { i, j };
        }
      }
    }
  };

  const simulateMoves = async (commandList: any) => {
    const playerCoord = findPlayer();
    console.log(playerCoord);
    // @ts-ignore
    let tempX = playerCoord.i;
    // @ts-ignore
    let tempY = playerCoord.j;
    let tempImg = "";
    for (let i = 0; i < commandList.length; i++) {
      let currTempImage =
        levelData.levelMap[commandList[i].x][commandList[i].y].img;
      executeMove(commandList[i].x, commandList[i].y, tempX, tempY, tempImg);
      console.log(commandList[i].x, commandList[i].y, tempX, tempY);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      tempImg = currTempImage;
      tempX = commandList[i].x;
      tempY = commandList[i].y;
    }
  };

  const executeMove = (
    x: number,
    y: number,
    oldX: number,
    oldY: number,
    oldImg: string
  ) => {
    const newGrid = { ...levelData };

    newGrid.levelMap[oldX][oldY].img = oldImg;
    newGrid.levelMap[oldX][oldY].type = 0;

    newGrid.levelMap[x][y].img =
      "https://imagizer.imageshack.com/v2/255x220q70/r/922/8Y3PGq.png";
    newGrid.levelMap[x][y].type = 2;

    setLevelData({ ...newGrid });
  };

  return (
    <Container className="mt-5 mb-5">
      <div className="d-flex">
        {/* left side */}
        <div className="d-block">
          <h1 className="level-title">{levelData.title}</h1>
          <div
            className="map p-1"
            style={{
              backgroundImage: "url(/map-background.jpeg)",
            }}
          >
            {levelData?.levelMap.map((row: any, rowIdx: number) => {
              return (
                <Row key={rowIdx}>
                  {row.map((node: any, nodeIdx: number) => {
                    return <Node node={node} key={nodeIdx} />;
                  })}
                </Row>
              );
            })}
          </div>
          <div className="level-description">{levelData.description}</div>
        </div>
        {/**/}
        <div className="level-ide">
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

          <div className="d-flex justify-content-between mt-3">
            <Form.Select className="w-50" aria-label="Default select example">
              <option>Select one language</option>
              <option value="js">JavaScript</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </Form.Select>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <Button onClick={submitCode}>Submit</Button>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
