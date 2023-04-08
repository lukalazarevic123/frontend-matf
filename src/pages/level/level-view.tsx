import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { Node } from "../../components/node/node";

interface ILevel {
  width: number;
  height: number;
  rating: number;
  grid: any;
  title: string;
  description: string;
}

export const LevelView = () => {
  const [levelData, setLevelData] = useState<ILevel>({
    width: 10,
    height: 10,
    grid: [
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    ],
    rating: 5,
    title: "New level",
    description: "Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
  });

  useEffect(() => {
    levelData.grid.map((row: any) => {
      console.log(row);
    });
  }, []);

  return (
    <Container>
      <div className="map">
        {levelData?.grid.map((row: any, rowIdx: number) => {
          return (
            <Row key={rowIdx}>
              {row.map((node: any, nodeIdx: number) => {
                return (
                    <Node node={node} />
                );
            })}
            </Row>
          );
        })}
      </div>
    </Container>
  );
};
