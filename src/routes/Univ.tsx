import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Rank from "../Components/Modal";
import DialogButton from "../Components/DialogButton";
import RangeSlider from "../Components/RangeSlider";
import BackgroundSrc from "../Assets/Img/backimg3.jpg";
import SearchSrc from "../Assets/Img/searchIcon.png";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Handle } from "../Components/RangeSlider";
// import SearchBar from "../Components/SearchBar";

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
  max-width: 800px;
  margin: 0 auto;
  size: cover;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
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
  menuId: number;
  menuName: string;
  menuPrice: number;
  menuImg: string;
}

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
  const [keyword, setKeysord] = useState<string>("");
  const data = {
    minimumPrice: 0,
    maximumPrice: maxPrice,
    searchKeywordList: [],
    sortMethod: sortMethod,
    showZeroPriceItems: true,
    school: univId
  };
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

  const onChangeSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setKeysord(e.currentTarget.value);
  };

  const postRank = async (data: FoodInterface) => {
    try {
      const response = await axios.post('http://13.125.233.202/api/rank', { menuId: data.menuId }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
      console.log(response);
      console.log('POST 요청이 성공적으로 전송되었습니다.');
      // 성공적으로 요청이 전송되었을 때 실행할 코드를 추가하세요.
    } catch (error) {
      console.error('POST 요청 중 오류가 발생하였습니다:', error);
      // 오류가 발생했을 때 실행할 코드를 추가하세요.
    }
  };


  return (
    <Background>
      <Main>
        <Title> {state.univName} Ranking </Title>
        {/* <SearchBar onChangeSearch={onChangeSearch} /> */}
        {isOpenRank && (
          <Rank onClickToggleModal={onClickToggleModal}>
          </Rank>
        )}
        <DialogButton onClickToggleModal={onClickToggleModal} />
        <RangeSlider />
        {loading ? (
          <Loader>Loading...</Loader>
        ) : (
          <FoodsList>
            {foods.map((f) => (
              <FoodBox onClick={() => postRank(f)}>
                <a href={f.placeLink} style={{ cursor: 'pointer' }}>
                  <FoodImg src={`${f.menuImg}`} />
                  <span>{f.menuName}</span>
                  <span>{f.menuPrice}</span>
                  <div align-items="horizontal">
                    <span>{f.placeName}</span>
                    <span>{f.placeRating}</span>
                  </div>
                </a>
              </FoodBox>
            ))}
          </FoodsList>
        )}
      </Main>
    </Background>
  );
}

export default Univ;