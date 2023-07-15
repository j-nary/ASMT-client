// 랭킹 display 버튼

import { useState, useEffect } from "react";
import styled from "styled-components";

const DialogButtonWrapper = styled.button`
  width: 160px;
  height: 40px;
  background-color: gray;
  color: black;
  font-size: 1.2rem;
  font-weight: 400;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-1px);
  }
`;

// DialogButton onClickToggleModal 등록
interface DialogButtonProps {
    onClickToggleModal: () => void;
}

// DialogButton 컴포넌트
const DialogButton: React.FC<DialogButtonProps> = ({ onClickToggleModal }) => {
    const [currentLetter, setCurrentLetter] = useState<string>('');
    
    useEffect(() => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'; // 랭킹 메뉴 및 가게명으로 대체될 예정
        let currentIndex = 0;

        const interval = setInterval(() => {
            setCurrentLetter(alphabet[currentIndex]);
            currentIndex++;

            if (currentIndex >= alphabet.length) {
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
            <h1>{currentLetter}</h1>
        </DialogButtonWrapper>
    );
};

export default DialogButton;