import {useState, useCallback} from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Rank from "./components/Rank";
import BackgroundSrc from "../img/backimg3.jpg";
import { useLocation } from "react-router-dom";

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

const Title = styled.h3`
  text-align: center;
`;

const DialogButton = styled.button`
  width: 160px;
  height: 48px;
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

interface RouteParams {
    univId: string;
}
interface RouteState {
    univName: string;
}

function Univ() {
    const {univId} = useParams<RouteParams>();    
    const [isOpenRank, setOpenRank] = useState<boolean>(false);
    const {state} = useLocation<RouteState>();
    const onClickToggleModal = useCallback(() => {
        setOpenRank(!isOpenRank);
    }, [isOpenRank]);

    return (
      <Background>
        <Main>
            <Title> {state.univName} Ranking </Title>
            {isOpenRank && (
                <Rank onClickToggleModal={onClickToggleModal}>
                    Ranking list
                </Rank>
            )}
            <DialogButton onClick={onClickToggleModal}>Open Rank</DialogButton>
        </Main>
      </Background>
    );
}

export default Univ;