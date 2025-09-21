import React from "react";
import Spinner from "./Spinner";

const Loader = () => {
  return (
    <div className="w-full h-[65vh] flex items-center justify-center">
      <div className="h-10 w-10">
        <Spinner className="fill-green-500 text-green-50" />
      </div>
    </div>
  );
};

export default Loader;
