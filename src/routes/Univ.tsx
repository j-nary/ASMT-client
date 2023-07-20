import { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Modal from "../Components/Modal";
import DialogButton from "../Components/DialogButton";
import RangeSlider from "../Components/RangeSlider";
import RadioComponent, { Option } from "../Components/Radio";
import BackgroundSrc from "../Assets/Img/backimg3.jpg";
import ImageComponent from "../Components/FoodImage";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Handle } from "../Components/RangeSlider";
import SearchBar from "../Components/SearchBar";
import { useInView } from "react-intersection-observer";
import BookmarkOff from "../Assets/Img/bookmarkOff.png";
import BookmarkOn from "../Assets/Img/bookmarkOn.png";
import Cookies from "js-cookie";
import LogoSrc from "../Assets/Img/logo2.jpeg";
import { boolean } from "yargs";
import { isMobile, getUA } from "react-device-detect";
// import {Platform} from "react-native";

// let DeviceInfo: { getUniqueId: () => any; };
// if (Platform.OS === "web") {
//   DeviceInfo = require("some-web-device-info-package");
// } else {
//   DeviceInfo = require("react-native-device-info");
// }

const Background = styled.div`
  background-image: url(${BackgroundSrc});
  background-size: cover;
  background-position: center;
  align-items: center;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  size: cover;
  position: relative;
  min-height: 100vh;
  font-family: "jjwfont", sans-serif;
`;

const LogoImage = styled.img`
  width: 400px;
  height: auto;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    width: 250px;
  }
`;
const UnivName = styled.p`
  font-size: 1.2rem;
  text-align: center;
  color: black;
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
  margin-top: 3rem;
`;

const RangeSliderWrapper = styled.ul`
  width: 110vh;
  height: 100px;

  align-content: center;
  margin: 0 10px;

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 80px;

    margin: 0;
  }
`;

const Container = styled.div`
  height: calc(100vh - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  font-family: "jjwfont2", sans-serif;
`;

const FoodsList = styled.ul`
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 85vw;
  margin: 8px auto 0; /* 가운데 정렬 및 상단 여백 수정 */
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  /* 커스텀 스크롤바 스타일 적용 */
  scrollbar-width: thin;
  scrollbar-color: #6a91bd rgba(33, 122, 244, 0.1);

  @media screen and (max-width: 768px) {
    height: 100%;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    height: 30%;
    background: #6a91bd;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1);
  }
`;

const BookmarkIcon = styled.img`
  position: relative;
  float: right;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const FoodBox = styled.li`
  align-content: vertical;
  width: calc(50% - 1em);
  min-height: 33%;
  max-height: 33vw;
  border: 1px solid #aaa;
  border-radius: 7px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1em;
  margin: 0.5em;
  transition: all 0.4s;
  background-color: white;

  @media screen and (max-width: 768px) {
    width: 100%;
    min-height: 25%;
    max-height: 25%;
  }

  &:hover {
    background-color: #b0e0e6;
  }
`;

const FoodName = styled.li`
  font-weight: bold;
  margin-bottom: 0.3em;
  margin-top: 0.5em;
`;

const FoodInfo = styled.li`
  width: 100%;
  max-height: fit-content;
  margin-left: 2em;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [minPrice, setMinPrice] = useState<number>(state.minimumPrice);
  const [maxPrice, setMaxPrice] = useState<number>(state.maximumPrice);
  const [sortMethod, setSortMethod] = useState<Option>("lowPrice");
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [showZeroPrice, setShowZeroPrice] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [init, setInit] = useState<boolean>(false);
  const [ref, inView] = useInView();

  // const newMinPrice = minPrice < 2000 ? 2000 : minPrice;
  // const newMaxPrice = maxPrice == 20000 ? 1000000 : maxPrice;
  const data = {
    minimumPrice: minPrice < 2000 ? 2000 : minPrice,
    maximumPrice: maxPrice === 20000 ? 1000000 : maxPrice,
    searchKeywordList: keywordList,
    sortMethod: sortMethod,
    showZeroPriceItems: showZeroPrice,
    school: univId,
    userId: "유저아이디칸_추후동적으로할당해주세요",
    page: 1,
  };
  const fetchData = async () => {
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
      setFoods((prev) => [...prev, ...response.data]);
      setLoading(false);
      setPage((page) => page + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setFoods([]);
    if (init === false) {
      setInit(true);
    } else fetchData();
  }, [keywordList, sortMethod, minPrice, maxPrice]);

  useEffect(() => {
    // inView가 true 일때만 실행한다.
    if (inView) {
      console.log(inView, "무한 스크롤 요청 ");
      data.page = page;
      fetchData();
    }
  }, [inView]);

  const onClickToggleModal = useCallback(() => {
    setOpenRank(!isOpenRank);
  }, [isOpenRank]);

  const handleSearch = (query: string) => {
    if (query.trim() !== "" && !keywordList.includes(query)) {
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
      const response = await axios.post(
        "http://13.125.233.202/api/rank",
        { menuId: data.menuId },
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      console.log(response);
      console.log("POST 요청이 성공적으로 전송되었습니다.");
      // 성공적으로 요청이 전송되었을 때 실행할 코드를 추가하세요.
    } catch (error) {
      console.error("POST 요청 중 오류가 발생하였습니다:", error);
      // 오류가 발생했을 때 실행할 코드를 추가하세요.
    }
  };

  const handleSortMethodChange = (option: Option) => {
    setSortMethod(option);
    setPage(0);
    console.log(option);
  };
  const handleSliderChange = (values: readonly number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
  };

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const generateUserId = () => {
      const timestamp = Date.now().toString();
      const randomNumber = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
      const userId = timestamp + randomNumber;
      return userId;
    };
    const getCookie = (name: string) => {
      const value = "; " + document.cookie;
      const parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts[1].split(";").shift();
    };

    const setCookie = (name: string, value: string) => {
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 10); // Set the expiration date 10 years in the future

      const formattedDate = expirationDate.toUTCString();
      document.cookie =
        name + "=" + value + "; expires=" + formattedDate + "; path=/";
    };
    const fetchUserId = () => {
      if (isMobile) {
        const id = navigator.userAgent;
        setUserId(id); 
      } else {
        const idFromCookie = getCookie("user_id");
        if (idFromCookie) {
          setUserId(idFromCookie);
        } else {
          // If not, generate a new user ID and store it in cookies.
          const newId = generateUserId();
          setCookie("user_id", newId);
          setUserId(newId);
        }
      }
    };

    fetchUserId();
  }, []);

  const [bookmarkItems, setBookmarkItems] = useState<FoodInterface[]>([]);
  useEffect(() => {
    const getBookmark = async () => {
      try {
        const response = await axios.get("http://13.125.233.202/api/bookmark", {
          params: {
            userId: userId,
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response.data);
        setBookmarkItems(response.data);
      } catch (error) {
        console.error("북마크 GET 요청 중 오류가 발생하였습니다: ", error);
      }
    };

    getBookmark();
  }, [userId]);

  const addToBookmark = async (menuId: number) => {
    try {
      await axios.post(
        "http://13.125.233.202/api/bookmark",
        { userId: userId, menuId: menuId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("북마크 POST 요청 중 오류가 발생하였습니다: ", error);
    }
  };

  // Function to remove a menu from bookmarks on the server
  const removeFromBookmark = async (menuId: number) => {
    try {
      await axios.delete("http://13.125.233.202/api/bookmark", {
        data: { menuId: menuId, userId: userId },
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("북마크 DELETE 요청 중 오류가 발생하였습니다: ", error);
    }
  };

  // Updated toggleBookmark function
  const toggleBookmark = async (menuId: number) => {
    if (bookmarkItems.some((item) => item.menuId === menuId)) {
      removeFromBookmark(menuId);
      const updatedItems = bookmarkItems.filter(
        (item) => item.menuId !== menuId
      );
      setBookmarkItems(updatedItems);
    } else {
      await addToBookmark(menuId);
      setBookmarkItems([
        ...bookmarkItems,
        ...foods.filter((item) => item.menuId === menuId),
      ]);
    }
  };

  const ShowBookmarkImage = styled.img`
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-left: auto;
    z-index: 100;
    margin-right: 20px;
  `;
  const [showBookmark, setShowBookmark] = useState<boolean>(false);
  const toggleShowBookmark = () => {
    setShowBookmark(!showBookmark);
  };

  const RadioList = styled.ul`
    height: 20%;
    overflow-x: hidden;
    overflow-y: hidden;
    width: 85vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    /* 커스텀 스크롤바 스타일 적용 */
    scrollbar-width: thin;
    scrollbar-color: #6a91bd rgba(33, 122, 244, 0.1);

    @media screen and (max-width: 768px) {
      height: 10%;
    }

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      height: 30%;
      background: #6a91bd;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(33, 122, 244, 0.1);
    }
  `;

  return (
    <Background>
      <Main>
        <Link to="/">
          <LogoImage src={LogoSrc} alt="Logo" />
        </Link>
        <UnivName>-{state.univName}-</UnivName>
        <SearchBar onSearch={handleSearch} onRemoveTip={removeTip} />

        {isOpenRank && (
          <Modal
            univName={univId}
            onClickToggleModal={onClickToggleModal}
          ></Modal>
        )}
        <DialogButton
          univName={univId}
          onClickToggleModal={onClickToggleModal}
        />
        <RangeSliderWrapper>
          <RangeSlider
            onChangeValues={handleSliderChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </RangeSliderWrapper>

        <RadioList>
          <RadioComponent setSortMethod={handleSortMethodChange} />
          <ShowBookmarkImage
            src={showBookmark ? BookmarkOn : BookmarkOff}
            onClick={toggleShowBookmark}
          />
        </RadioList>
        <Container>
          <FoodsList>
            {showBookmark ? (
              bookmarkItems.map((f) => (
                <FoodBox key={f.menuId} onClick={() => postRank(f)}>
                  {bookmarkItems.some((item) => item.menuId === f.menuId) ? (
                    <BookmarkIcon
                      src={BookmarkOn}
                      alt="BookmarkOn"
                      onClick={() => toggleBookmark(f.menuId)}
                    />
                  ) : (
                    <BookmarkIcon
                      src={BookmarkOff}
                      alt="BookmarkOff"
                      onClick={() => toggleBookmark(f.menuId)}
                    />
                  )}
                  <a
                    href={f.placeLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{ cursor: "pointer" }}
                  >
                    <ImageComponent imageUrl={`${f.menuImg}`} />
                    <FoodInfo>
                      <FoodName>
                        <span>{f.menuName}</span>
                      </FoodName>
                      <span>{f.menuPrice}원</span>
                      <div align-items="vertical">
                        <span>{f.placeName}</span>
                      </div>
                      <span>
                        {f.placeDistance}m | ★: {f.placeRating}
                      </span>
                    </FoodInfo>
                  </a>
                </FoodBox>
              ))
            ) : (
              <>
                {foods.map((f) => (
                  <FoodBox key={f.menuId} onClick={() => postRank(f)}>
                    {bookmarkItems.some((item) => item.menuId === f.menuId) ? (
                      <BookmarkIcon
                        src={BookmarkOn}
                        alt="BookmarkOn"
                        onClick={() => toggleBookmark(f.menuId)}
                      />
                    ) : (
                      <BookmarkIcon
                        src={BookmarkOff}
                        alt="BookmarkOff"
                        onClick={() => toggleBookmark(f.menuId)}
                      />
                    )}
                    <a
                      href={f.placeLink}
                      target="_blank"
                      rel="noreferrer"
                      style={{ cursor: "pointer" }}
                    >
                      <ImageComponent imageUrl={`${f.menuImg}`} />
                      <FoodInfo>
                        <FoodName>
                          <span>{f.menuName}</span>
                        </FoodName>
                        <span>{f.menuPrice}원</span>
                        <div align-items="vertical">
                          <span>{f.placeName}</span>
                        </div>
                        <span>
                          {f.placeDistance}m | ★: {f.placeRating}
                        </span>
                      </FoodInfo>
                    </a>
                  </FoodBox>
                ))}
                <div ref={ref}></div>
              </>
            )}
          </FoodsList>
        </Container>
      </Main>
    </Background>
  );
}

export default Univ;
