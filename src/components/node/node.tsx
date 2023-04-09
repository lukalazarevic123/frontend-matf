import React, {useState} from "react";
import "./node.css";

interface NodeProps {
    node: any;
    onClick?: any;
}

export const Node = ({ node, onClick }:NodeProps) => {

    return (
        <div className="node" onClick={onClick}> 
        {/* @ts-ignore */}
        {
            node.img ? (
                <img src={node.img} className="node-background" />
            ) : (
                <div></div>
            )
        }
        </div>
    )
}