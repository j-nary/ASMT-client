// 랭킹 display 버튼
import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const DialogButtonWrapper = styled.button`
  width: 82vh;
  height: 30px; /* 원하는 높이 설정 */
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: white;
  color: black;
  font-size: 1.1rem;
  font-weight: 400;
  border-radius: 4px;
  border: 2px solid #B0E0E6;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  font-family: "jjwfont", sans-serif;
  
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;

  &:hover {
    background-color: #B0E0E6;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    height: 60px; /* 원하는 높이 설정 */
    align-items: center;
    justify-content: center;
    overflow: hidden;


    margin: 0 
  }
`;

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

// DialogButton onClickToggleModal 등록
interface DialogButtonProps {
  univName: string;
  onClickToggleModal: () => void;
}

const API_URL = "http://13.125.233.202/api/rank";

// DialogButton 컴포넌트
const DialogButton: React.FC<DialogButtonProps> = ({ univName, onClickToggleModal }) => {
  const [menu, setMenu] = useState<string[]>([]);
  const [place, setPlace] = useState<string[]>([]);
  const [currentMenu, setCurrentMenu] = useState<string>('');
  const [currentPlace, setCurrentPlace] = useState<string>('');
  const [currentRank, setCurrentRank] = useState(0);
  let currentIndex = 0;

  const [foods, setFoods] = useState<FoodInterface[]>([]);


  useEffect(() => {
    const getFoods = async () => {
      try {
        const response = await axios.get<FoodInterface[]>(API_URL, {
          params: {
            rankCount: 5,
            school: univName
          }
        });

        const fetchedFoods = response.data;
        setFoods(fetchedFoods);
      } catch (error) {
        console.error(error);
      }
    };

    getFoods(); // 랭킹 정보 가져오기

    const menuNames = foods.map((f) => f.menuName);
    const placeNames = foods.map((f) => f.placeName);

    setMenu(menuNames);
    setPlace(placeNames);
  }, [univName]);

  useEffect(() => {
    const menuNames = foods.map((f) => f.menuName);
    const placeNames = foods.map((f) => f.placeName);

    setMenu(menuNames);
    setPlace(placeNames);
  }, [foods]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMenu(menu[currentIndex]);
      setCurrentPlace(place[currentIndex]);
      setCurrentRank(currentIndex + 1);
      currentIndex++;

      if (currentIndex >= menu.length) {
        currentIndex = 0;
      }
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, [menu, place]);

  return (
    <DialogButtonWrapper onClick={onClickToggleModal}>
      {currentRank!=0 ? (
        <h1>
          {currentRank}. {currentPlace} - {currentMenu}
        </h1>
      ) : null}
    </DialogButtonWrapper>
  );
};

export default DialogButton;