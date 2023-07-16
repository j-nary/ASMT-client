import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Rank from "../Components/Rank";
import BackgroundSrc from "../Assets/Img/backimg3.jpg";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { RangeSlider } from "..";
import { Handle } from "../Components/RangeSlider";

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
  height: 100%;
  outline: none;
`;
const Loader = styled.span`
  text-align: center;
  display: block;
  margin-top: 3rem;
`;
const FoodsList = styled.ul``;
const FoodBox = styled.li`
  height: 80px;
  background-color: yellow;
  padding-bottom: 2px;
  padding-top: 2px;
  padding-left: 2px;
  padding-right: 2px;
  margin-bottom: 1rem;
`;
const FoodImg = styled.img`
  height: 100%;
`;

const API_URL = "http://13.125.233.202/api/search";

interface RouteParams {
  univId: string;
}
interface RouteState {
  univName: string;
  minimumPrice: number;
  maximumPrice: number;
  univId: string;
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
// const foods = [
//   {
//     placeName: "존맛집",
//     placeAddress: "서울 동작구 사당로 6-1",
//     placeRating: 4.34,
//     placeLink: "https://map.naver.com/v5/entry/place/35688740",
//     placeDistance: 352,
//     school: "ssu",
//     menuName: "제계치2",
//     menuPrice: 150000,
//     menuImg:
//       "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https://ldb-phinf.pstatic.net/20200116_202/1579159139861EGFkk_JPEG/570619_286_20170526164736.jpg",
//   },
//   {
//     placeName: "존맛집",
//     placeAddress: "서울 동작구 사당로 6-1",
//     placeRating: 4.34,
//     placeLink: "https://map.naver.com/v5/entry/place/35688740",
//     placeDistance: 352,
//     school: "ssu",
//     menuName: "제계치2",
//     menuPrice: 150000,
//     menuImg:
//       "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https://ldb-phinf.pstatic.net/20200116_202/1579159139861EGFkk_JPEG/570619_286_20170526164736.jpg",
//   },
//   {
//     placeName: "존맛집",
//     placeAddress: "서울 동작구 사당로 6-1",
//     placeRating: 4.34,
//     placeLink: "https://map.naver.com/v5/entry/place/35688740",
//     placeDistance: 352,
//     school: "ssu",
//     menuName: "제계치2",
//     menuPrice: 150000,
//     menuImg:
//       "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https://ldb-phinf.pstatic.net/20200116_202/1579159139861EGFkk_JPEG/570619_286_20170526164736.jpg",
//   },
// ];
interface ApiPostInterface {
  minimumPrice: number;
  maximumPrice: number;
  searchKeywordList: string[];
  sortMethod: string;
  showZeroPriceItems: boolean;
  school: string;
}
function Univ() {
  const { univId } = useParams<RouteParams>();
  const [isOpenRank, setOpenRank] = useState<boolean>(false);
  const { state } = useLocation<RouteState>();
  const [foods, setFoods] = useState<FoodInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState([]);
  const [minPrice, setMinPrice] = useState(state.minimumPrice);
  const [maxPrice, setMaxPrice] = useState(state.maximumPrice);
  const [sortMethod, setSortMethod] = useState("lowPrice");

  const data = {
    minimumPrice: 0,
    maximumPrice: maxPrice,
    searchKeywordList:[],
    sortMethod: sortMethod,
    showZeroPriceItems: true,
    school: univId };
  useEffect(() => {
    (async () => {
      try {
        // console.log(typeof(state.univId));
        console.log(`data = ${data}`);
        console.log(data);
        const jsonData = JSON.stringify(data);
        console.log(jsonData);
        const response = await axios.post(API_URL, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setFoods(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [filter]);

  const onClickToggleModal = useCallback(() => {
    setOpenRank(!isOpenRank);
  }, [isOpenRank]);

  return (
    <Background>
      <Main>
        <Title> {state.univName} Ranking </Title>
        <SearchContainer>
          <SearchBar />
          <img src="../Assets/Img/searchIcon.png" alt="searchIcon" />
        </SearchContainer>
        {isOpenRank && (
          <Rank onClickToggleModal={onClickToggleModal}>Ranking list</Rank>
        )}
        <DialogButton onClick={onClickToggleModal}>Open Rank</DialogButton>
        <RangeSlider />
        {/* <Handle domain={[minPrice, maxPrice]} handle={} getHandleProps={} /> */}
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <FoodsList>
            {foods.map((f) => (
              <FoodBox>
                <FoodImg src={`${f.menuImg}`} />
                <span>{f.menuName}</span>
                <span>{f.menuPrice}</span>
                <div align-items="horizontal">
                  <span>{f.placeName}</span>
                  <span>{f.placeRating}</span>
                </div>
              </FoodBox>
            ))}
          </FoodsList>
        )}
      </Main>
    </Background>
  );
}

export default Univ;