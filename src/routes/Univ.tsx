import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Rank from "../Components/Rank";
import BackgroundSrc from "../Assets/Img/backimg3.jpg";
import { Link, useLocation } from "react-router-dom";

// TODO: Background 수정 필요
const Background = styled.div`
  background-image: url(${BackgroundSrc});
  background-size: cover;
  background-position: center;
`;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;

  font-size: 2rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const DialogButton = styled.button`
  width: 160px;
  height: 40px;
  background-color: black;
  color: white;
  font-size: 1.2rem;
  font-weight: 400;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }
`;

const SearchContainer = styled.div`
  width: 400px;
  height: 45px;
  position: relative;
  border: 0;
  img {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  margin-bottom: 1rem;
`;
const SearchBar = styled.input`
  border: 0;
  padding-left: 10px;
  background-color: #eaeaea;
  width: 100%;
  height:100%;
  outline: none;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
  margin-top: 3rem;
`;
const FoodsList = styled.ul``;
const FoodBox = styled.li``;
const FoodImg = styled.img``;

interface RouteParams {
  univId: string;
}
interface RouteState {
  univName: string;
}
interface FoodInterface {
  placeName: string;
  placeAddress: string;
  placeRating: number;
  placeLink: string;
  placeDistance: number;
  school: string;
  menuName: string;
  menuPrice: number;
  menuImg: string;
}
function Univ() {
  const { univId } = useParams<RouteParams>();
  const [isOpenRank, setOpenRank] = useState<boolean>(false);
  const { state } = useLocation<RouteState>();
  const [foods, setFoods] = useState<FoodInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await(await fetch("")).json();
      setFoods(response);
      setLoading(false);
    })();
  }, []);
  const onClickToggleModal = useCallback(() => {
    setOpenRank(!isOpenRank);
  }, [isOpenRank]);

  return (
    <Background>
      <Main>
        <Title> {state.univName} Ranking </Title>
        <SearchContainer>
          <SearchBar />
          <img src="../Assets/Img/searchIcon.png" alt="searchIcon"/>
        </SearchContainer>
        {isOpenRank && (
          <Rank onClickToggleModal={onClickToggleModal}>Ranking list</Rank>
        )}
        <DialogButton onClick={onClickToggleModal}>Open Rank</DialogButton>
        {loading ? (
          <Loader>Loading...</Loader>
        ): (
          <FoodsList>
            {foods.map((f) => (
            <FoodBox>
              <FoodImg src = {`${f.menuImg}`}/>
              </FoodBox>))}
          </FoodsList>
        )}
      </Main>
    </Background>
  );
}

export default Univ;
