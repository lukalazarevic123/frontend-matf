import React from "react";
import "./node.css";

interface NodeProps {
    node: any;
}

export const Node = ({ node }:NodeProps) => {

    

    return (
        <div className="node">
            <img src={node.img} alt="Node pic" className="node-background" />
        </div>
    )
}