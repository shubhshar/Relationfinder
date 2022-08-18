import React from "react";
import { Image } from "react-bootstrap";

const ProfImg = ({ img, name }) => {
  return (
    <>
      <div className="ProfImage">
        <Image src={img} thumbnail />
        <p>{name}</p>
      </div>
    </>
  );
};

export default ProfImg;
