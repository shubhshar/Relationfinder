import React from "react";

const Relations = ({ data }) => {
  console.log({ data });
  // const  data= ["Sam", "Kamal", "Ayush", "Bhaskar"];
  return (
    <p style={{ whiteSpace: "nowrap" }}>
      {data?.map((names, index) =>
        data.length - 1 == index ? (
          <span className="relation-text">{`${names}`}</span>
        ) : (
          <>
            {" "}
            <span className="relation-text">{`${names}`}</span>{" "}
            <span className="relation-arrow ">=></span>
          </>
        )
      )}
    </p>
  );
};
export default Relations;
