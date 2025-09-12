import { Search } from "lucide-react";
import React from "react";

const SearchBox = () => {
  return (
    <div className="w-full">
      <form action="" method="get" className="w-full h-full flex items-center">
        <input
          className="w-full h-12 outline-none border-none"
          placeholder="Search for products ..."
        />
        <button
          type="submit"
          className="w-11 h-11 flex items-center justify-center"
        >
          <Search className="size-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
