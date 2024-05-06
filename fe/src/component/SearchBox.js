import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBox = ({ query, searchQuery, setSearchQuery, placeholder, field }) => {
  // const [query] = useSearchParams();
  // const [keyword, setKeyword] = useState(searchQuery.get(field) || "");
  const [keyword, setKeyword]=useState('')

  const onCheckEnter = (event) => {
    if (event.key === "Enter") {
       query.set('page', searchQuery.page)
      if(searchQuery.name ===''){
        delete searchQuery.name
      } else{
        query.set('name', searchQuery.name)
      }

      setSearchQuery({ ...searchQuery, page: 1, [field]: event.target.value });
    }
  };
  return (
    <div className="search-box">
      <FontAwesomeIcon icon={faSearch} />
      <input
        type="text"
        placeholder={placeholder}
        onKeyPress={onCheckEnter}
        onChange={(event) => setKeyword(event.target.value)}
        value={keyword}
      />
    </div>
  );
};

export default SearchBox;
