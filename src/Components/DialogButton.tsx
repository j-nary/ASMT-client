// 랭킹 display 버튼
import { useState, useEffect } from "react";
import styled from "styled-components";

const DialogButtonWrapper = styled.button`
  width: 50vh;
  height: cover;
  background-color: white;
  color: black;
  font-size: 1.2rem;
  font-weight: 400;
  border-radius: 4px;
  border: 2px solid #B0E0E6;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #B0E0E6;
  }
`;

// DialogButton onClickToggleModal 등록
interface DialogButtonProps {
    onClickToggleModal: () => void;
}

// DialogButton 컴포넌트
const DialogButton: React.FC<DialogButtonProps> = ({ onClickToggleModal }) => {
    const [currentLetter, setCurrentLetter] = useState<string>('');
    const [currentRank, setCurrentRank] = useState(0);

    let currentIndex = 0;

    useEffect(() => {
        const ranking = ['apple', 'banana', 'pear', 'cherry', 'strawberry', 'mellon']; // 랭킹 메뉴 및 가게명으로 대체될 예정

        const interval = setInterval(() => {
            setCurrentLetter(ranking[currentIndex]);
            setCurrentRank(currentIndex+1);
            currentIndex++;

            if (currentIndex >= ranking.length) {
                //clearInterval(interval); -> 1회 순환에서 끝남
                currentIndex = 0;
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <DialogButtonWrapper onClick={onClickToggleModal}>
            <h1>{currentRank}. {currentLetter}</h1>
        </DialogButtonWrapper>
    );
};

export default DialogButton;