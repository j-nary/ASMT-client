import { styled } from "styled-components";
import SearchSrc from "../Assets/Img/searchIcon.png";
import { useState } from "react";

const SearchContainer = styled.div`
  width: 400px;
  height: 45px;
  position: relative;
  border: 0;
  img {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
  margin-bottom: 2.5rem;
  font-family: "jjwfont2", sans-serif;
  font-weight: light;
`;
const Search = styled.input`
  border: 0;
  padding-left: 10px;
  background-color: #eaeaea;
  width: 100%;
  height: 100%;
  outline: none;
  font-family: "jjwfont2", sans-serif;
`;
const TipContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  flex-wrap: wrap;
`;

const Tip = styled.div`
  background-color: grey;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  position: relative;
  display: flex;
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
`;

interface SearchBarProps {
  onSearch: (query: string) => void;
  onRemoveTip: (index: number) => void;
}

function SearchBar({ onSearch, onRemoveTip }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueries, setSearchQueries] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(searchQuery);
      addSearchQuery(searchQuery);
    }
  };

  const addSearchQuery = (query: string) => {
    if (query.trim() !== "") {
      if (searchQueries.length < 5) {
        setSearchQueries((prevQueries) => [...prevQueries, query]);
      }
      setSearchQuery("");
    }
  };

  const removeSearchQuery = (index: number) => {
    onRemoveTip(index);
    setSearchQueries((prevQueries) =>
      prevQueries.filter((_, i) => i !== index)
    );
  };

  return (
    <SearchContainer>
      <Search
        type="text"
        value={searchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={`먹고싶은 메뉴를 입력해주세요! (${searchQueries.length}/5)`}
      />
      <img
        src={SearchSrc}
        alt="search"
        onClick={() => addSearchQuery(searchQuery)}
      />
      <div style={{ display: "flex" }}>
        {searchQueries.map((query, index) => (
          <TipContainer key={index}>
            <Tip>
              {query}
              <CloseButton onClick={() => removeSearchQuery(index)}>
                X
              </CloseButton>
            </Tip>
          </TipContainer>
        ))}
      </div>
    </SearchContainer>
  );
}

export default SearchBar;
