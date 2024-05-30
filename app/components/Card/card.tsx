import React from "react";

const Card = ({ children }: any) => {
  return (
    <>
      <div className="card border border-gray-300 rounded p-4 bg-white text-gray-600">
        {children}
      </div>
    </>
  );
};

export default Card;
