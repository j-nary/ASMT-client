import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Modal from "../Components/Modal";
import DialogButton from "../Components/DialogButton";
import RangeSlider from "../Components/RangeSlider";
import RadioComponent, { Option } from "../Components/Radio";
import BackgroundSrc from "../Assets/Img/backimg3.jpg";
import ImageComponent from "../Components/FoodImage";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Handle } from "../Components/RangeSlider";
import SearchBar from "../Components/SearchBar";
import { useInView } from 'react-intersection-observer';

const Background = styled.div`
  background-image: url(${BackgroundSrc});
  background-size: cover;
  background-position: center;
  align-items: center;
`;

const Main = styled.main`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  size: cover;
  position: relative;
  min-height: 100vh;
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

const RangeSliderWrapper = styled.ul`
  width: 100vh;
  height: 100px;
  align-content: center;
  margin: 0 10px;
`;

const Container = styled.div`
  height: calc(100vh - 300px); 
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FoodsList = styled.ul`
  max-height: 41em;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 65%;
  margin: 8px auto 0; /* 가운데 정렬 및 상단 여백 수정 */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start; 
  /* 커스텀 스크롤바 스타일 적용 */
  scrollbar-width: thin;
  scrollbar-color: #6a91bd rgba(33, 122, 244, .1);
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: #6a91bd;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, .1);
  }
`;

const FoodBox = styled.li`
  align-content: vertical;
  width: calc(50% - 1em); 
  min-height: 33%;
  max-height: 33%;
  border: 1px solid #aaa;
  border-radius: 7px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1em;
  margin: 0.5em;
  transition: all 0.4s;
  background-color: white;

  &:hover {
    background-color: #B0E0E6;
  }
  
`;

const FoodName = styled.li`
    font-weight: bold;
    margin-bottom: 0.3em;
    margin-top: 0.5em;
`;

const FoodInfo = styled.li`
  width:100%;
  max-height:fit-content;
  margin-left:2em;
  padding: 2px;
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
  page: Number;
}
function Univ() {
  const { univId } = useParams<RouteParams>();
  const [isOpenRank, setOpenRank] = useState<boolean>(false);
  const { state } = useLocation<RouteState>();
  const [foods, setFoods] = useState<FoodInterface[]>([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState(state.minimumPrice);
  const [maxPrice, setMaxPrice] = useState(state.maximumPrice);
  const [sortMethod, setSortMethod] = useState<Option>("lowPrice");
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [showZeroPrice, setShowZeroPrice] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const data = {
    minimumPrice: minPrice,
    minimumPrice: minPrice,
    maximumPrice: maxPrice,
    searchKeywordList: keywordList,
    sortMethod: sortMethod,
    showZeroPriceItems: showZeroPrice,
    school: univId,
    page: 1
  };
  const fetchData = (async () => {
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
      setFoods(prev => [...prev, ...response.data]);
      setLoading(false);
      setPage((page) => page + 1)
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    setFoods([]);
    fetchData();
  }, [keywordList, sortMethod])

  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      console.log(inView, '무한 스크롤 요청 ')
      data.page = page;

      fetchData();
    }
  }, [inView]);





  const onClickToggleModal = useCallback(() => {
    setOpenRank(!isOpenRank);
  }, [isOpenRank]);

  const handleSearch = (query: string) => {
    if (query.trim() !== '' && !keywordList.includes(query)) {
      // 최대 5개까지만 유지하는 로직 추가
      if (keywordList.length < 5) {
        setKeywordList([...keywordList, query]);
        setKeywordList([...keywordList, query]);
      }
    }
    console.log(keywordList);
  };
  const removeTip = (index: number) => {
    setKeywordList((prevList) => prevList.filter((_, i) => i !== index));
    console.log(keywordList);
  };

  useEffect(() => {
    console.log(keywordList);
  }, [keywordList]);

  // 클릭 한 번 할 시, 랭크에 기여
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

  const handleSortMethodChange = (option: Option) => {
    setSortMethod(option);
  };
  const handleSliderChange = (values: readonly number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };


  return (
    <Background>
      <Main>
        <Title> {state.univName} 맛집 리스트 </Title>
        <SearchBar onSearch={handleSearch} onRemoveTip={removeTip} />

        {isOpenRank && (
          <Modal univName={univId} onClickToggleModal={onClickToggleModal}>
          </Modal>
        )}
        <DialogButton univName={univId} onClickToggleModal={onClickToggleModal} />
        <RangeSliderWrapper>
          <RangeSlider onChangeValues={handleSliderChange} />
        </RangeSliderWrapper>
        <RadioComponent setSortMethod={handleSortMethodChange} />

        <Container>
          <FoodsList>
            {foods.map((f) => (
              <FoodBox onClick={() => postRank(f)}>
                <a href={f.placeLink} target="_blank" rel="noreferrer" style={{ cursor: 'pointer' }}>
                  <ImageComponent imageUrl={`${f.menuImg}`} />
                  <FoodInfo>
                    <FoodName>
                      <span>{f.menuName}</span>
                    </FoodName>
                    <span>{f.menuPrice}원</span>
                    <div align-items="vertical">
                      <span>{f.placeName}</span>
                    </div>
                    <span>{f.placeDistance}m | ★: {f.placeRating}</span>
                  </FoodInfo>
                </a>
              </FoodBox>
            ))}
            <Loader ref={ref}>Loading...</Loader>
          </FoodsList>
        </Container>
      </Main>
    </Background>
  );
}

export default Univ;