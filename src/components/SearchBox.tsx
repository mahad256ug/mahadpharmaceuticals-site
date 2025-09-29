import React, { FormEvent, useState } from "react";

// compnents
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchBox = ({
  defaultSearchValue = "",
}: {
  defaultSearchValue?: string;
}) => {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState<string>(
    defaultSearchValue ?? ""
  );

  const sanitizeInput = (input: string) => {
    return encodeURIComponent(input.trim());
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (searchInput && searchInput.trim().length > 0) {
      const sanitizedText = sanitizeInput(searchInput);
      console.log(sanitizedText);
      router.push(`/products/?search_query=${sanitizedText}&page=1`); //
    }
  }
  return (
    <div className="w-full">
      <form
        onSubmit={onSubmit}
        method="get"
        className="w-full h-full flex items-center"
      >
        <input
          className="w-full h-12 outline-none border-none"
          placeholder="Search for products ..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
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
