//브랜치 테스트4
import { useState } from "react";
import { Link } from "react-router-dom";
import RangeSlider from "../Components/RangeSlider";
import LogoSrc from "../Assets/Img/logo.png";
import BackgroundSrc from "../Assets/Img/backimg3.jpg";
import styled, { keyframes, css } from "styled-components";
import { InView } from "react-intersection-observer";
import handSrc from "../Assets/Img/handIcon.png";

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 800px;
  margin: 0 auto;
  size: cover;
  height: 100%;
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  overflow-y: hidden;

  background-image: url(${BackgroundSrc});
  background-size: cover;
  background-position: center;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-color: rgba(
    0,
    0,
    0,
    0.5
  ); /* 이미지 위에 겹칠 오버레이 색상 설정 */
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5vh;
  font-family: "jjwfont", sans-serif;
`;

const Logo = styled.img`
  height: 10vh;
  display: flex;
  margin: 3vh 3vh 5vh 3vh;
  font-family: "jjwfont", sans-serif;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: auto;
  }
`;

const UnivsList = styled.ul`
  display: grid;
  overflow-y: hidden;
  grid-template-columns: repeat(3, 1fr); /* 한 행에 3개씩 나열 */
  gap: 10px; /* 항목 사이의 간격 설정 */
  margin-top: 20px;
  justify-content: center; /* 가로 중앙 정렬 */

  @media screen and (max-width: 768px) {
    max-height: 24vh;

    overflow-y: scroll;
  }
`;

const Univ = styled.li<{ visible: boolean }>`
  background-color: #7aa0c4;
  border-radius: 15px;
  padding: 10px 10px;
  font-family: "jjwfont2", sans-serif;
  animation: ${({ visible }) =>
    visible &&
    css`
      ${fadeInAnimation} 0.5s ease-in-out
    `};

  a {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  &:hover {
    a {
      color: white;
    }
  }
`;

const HandIcon = styled.img`
  height: 30px; /* Adjust the height as needed */
`;

const NoSelectionMessage = styled(Univ)`
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  padding: 20px;
  border: none;
  background: none;
  white-space: nowrap; /* 한 줄로 표시 */
  text-align: center; /* 텍스트 가운데 정렬 */
  grid-column: 1 / 4; /* 그리드 세로 넓게 설정 */

  ${HandIcon} {
    margin-right: 10px;
  }

  
  @media screen and (max-width: 768px) {
  font-size: 20px;

  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props: any) => props.theme.circle1Color};

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }
`;

const univs = [
  { name: "가톨릭대학교", id: "catholic" },
  { name: "감리교신학대학교", id: "mtu" },
  { name: "건국대학교", id: "konkuk" },
  { name: "경기대학교", id: "kyonggi" },
  { name: "경희대학교", id: "khu" },
  { name: "고려대학교", id: "korea" },
  { name: "광운대학교", id: "kw" },
  { name: "국민대학교", id: "kookmin" },

  { name: "덕성여대학교", id: "duksung" },
  { name: "동국대학교", id: "dgu" },
  { name: "동덕여자대학교", id: "dongduk" },

  { name: "명지대학교", id: "mju" },

  { name: "백석대학교", id: "bu" },

  { name: "서울과학기술대학교", id: "seoultech" },
  { name: "서울교육대학교", id: "snue" },
  { name: "서울대학교", id: "snu" },
  { name: "서울시립대학교", id: "uos" },
  { name: "삼육대학교", id: "syu" },
  { name: "상명대학교", id: "smu" },
  { name: "서강대학교", id: "sogang" },
  { name: "서경대학교", id: "skuniv" },
  { name: "서울기독대학교", id: "scu" },
  { name: "서울여대학교", id: "swu" },
  { name: "서울한영대학교", id: "hytu" },
  { name: "성공회대학교", id: "skhu" },
  { name: "성균관대학교", id: "skku" },
  { name: "성신여대학교", id: "sungshin" },
  { name: "세종대학교", id: "sju" },
  { name: "숙명여대학교", id: "sookmyung" },
  { name: "숭실대학교", id: "ssu" },

  { name: "육군사관학교", id: "kma" },
  { name: "연세대학교", id: "yonsei" },
  { name: "이화여대학교", id: "ewhain" },

  { name: "장로회신학대학교", id: "puts" },
  { name: "중앙대학교", id: "cau" },

  { name: "총신대학교", id: "csu" },
  { name: "추계예술대학교", id: "sschugye" },

  { name: "한국과학기술원", id: "kaist" },
  { name: "한국예술종합학교", id: "karts" },
  { name: "한국체육대학교", id: "knsu" },
  { name: "한국방송통신대학교", id: "knou" },
  { name: "한국성서대학교", id: "bible" },
  { name: "한국외국어대학교", id: "hufs" },
  { name: "한성대학교", id: "hansung" },
  { name: "한신대학교", id: "hs" },
  { name: "한양대학교", id: "hanyang" },
  { name: "호서대학교", id: "hoseo" },
  { name: "홍익대학교", id: "hongik" },
];

const RangeSliderWrapper = styled.ul`
  width: 100%;
  height: 8vh;
  align-content: center;
  margin: 0 10px;

  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media (max-width: 600px) {
    flex-wrap: wrap;
    height: 60%;
    margin-top: 5px;
  }
`;

interface AlphabetButtonProps {
  active: boolean;
}
// h
const AlphabetButton = styled.button<AlphabetButtonProps>`
  font-size: 25px; /* 2배로 키움 */
  font-weight: bold;
  color: ${(props) => (props.active ? "#34568E" : "gray")};
  text-decoration: none;
  border: none;
  background: transparent;
  cursor: pointer;
  margin: 0 2px;

  &:hover {
    color: ${(props) => (props.active ? "#34568E" : "#34568E")};
  }

  @media (max-width: 600px) {
    margin: 0 1px;
  }
`;

function Main() {
  const [selectedAlphabet, setSelectedAlphabet] = useState("");
  const [filteredUnivs, setFilteredUnivs] = useState<any[]>([]); // 수정: any[]로 타입 설정
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

  const handleAlphabetClick = (alphabet: string) => {
    setSelectedAlphabet(alphabet);
    // 선택된 알파벳에 해당하는 학교 리스트 필터링

    let filteredList: any[] = []; // 수정:
    // 선택된 알파벳에 해당하는 학교 리스트 필터링
    if (alphabet === "ㄱ") {
      filteredList = univs.filter((univ) =>
        [
          "가톨릭대학교",
          "감리교신학대학교",
          "건국대학교",
          "경기대학교",
          "경희대학교",
          "고려대학교",
          "광운대학교",
          "국민대학교",
        ].includes(univ.name)
      );
    } else if (alphabet === "ㄴ") {
      filteredList = [];
    } else if (alphabet === "ㄷ") {
      filteredList = univs.filter((univ) =>
        ["덕성여대학교", "동국대학교", "동덕여자대학교"].includes(univ.name)
      );
    } else if (alphabet === "ㄷ") {
      filteredList = univs.filter((univ) =>
        ["덕성여대학교", "동국대학교", "동덕여자대학교"].includes(univ.name)
      );
    } else if (alphabet === "ㅁ") {
      filteredList = univs.filter((univ) => ["명지대학교"].includes(univ.name));
    } else if (alphabet === "ㅂ") {
      filteredList = univs.filter((univ) => ["백석대학교"].includes(univ.name));
    } else if (alphabet === "ㅅ") {
      filteredList = univs.filter((univ) =>
        [
          "서울과학기술대학교",
          "서울교육대학교",
          "서울대학교",
          "서울시립대학교",
          "삼육대학교",
          "상명대학교",
          "서강대학교",
          "서경대학교",
          "서울기독대학교",
          "서울여대학교",
          "서울한영대학교",
          "성공회대학교",
          "성균관대학교",
          "성신여대학교",
          "세종대학교",
          "숙명여대학교",
          "숭실대학교",
        ].includes(univ.name)
      );
    } else if (alphabet === "ㅇ") {
      filteredList = univs.filter((univ) =>
        ["육군사관학교", "연세대학교", "이화여대학교"].includes(univ.name)
      );
    } else if (alphabet === "ㅈ") {
      filteredList = univs.filter((univ) =>
        ["장로회신학대학교", "중앙대학교"].includes(univ.name)
      );
    } else if (alphabet === "ㅊ") {
      filteredList = univs.filter((univ) =>
        ["총신대학교", "추계예술대학교"].includes(univ.name)
      );
    } else if (alphabet === "ㅎ") {
      filteredList = univs.filter((univ) =>
        [
          "한국과학기술원",
          "한국예술종합학교",
          "한국체육대학교",
          "한국방송통신대학교",
          "한국성서대학교",
          "한국외국어대학교",
          "한성대학교",
          "한신대학교",
          "한양대학교",
          "호서대학교",
          "홍익대학교",
        ].includes(univ.name)
      );
    } else {
      filteredList = [];
    }

    setFilteredUnivs(filteredList);
  };

  const handleSliderChange = (values: readonly number[]) => {
    setMinPrice(values[0]);
    setMaxPrice(values[1]);
    console.log(values[0], values[1]);
  };

  return (
    <Background>
      <Container>
        <Header>
          <Logo src={LogoSrc} alt="Logo" />
          <Title>얼마 쓸래?</Title>
        </Header>
        <RangeSliderWrapper>
          <RangeSlider
            onChangeValues={handleSliderChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
        </RangeSliderWrapper>
        <div>
          {/* 알파벳 버튼 리스트 */}
          <ButtonWrapper>
            {" "}
            {/* 추가: 버튼을 감싸는 Wrapper */}
            {[
              "ㄱ",
              "ㄴ",
              "ㄷ",
              "ㄹ",
              "ㅁ",
              "ㅂ",
              "ㅅ",
              "ㅇ",
              "ㅈ",
              "ㅊ",
              "ㅋ",
              "ㅌ",
              "ㅍ",
              "ㅎ",
            ].map((alphabet) => (
              <AlphabetButton
                key={alphabet}
                onClick={() => handleAlphabetClick(alphabet)}
                active={selectedAlphabet === alphabet}
              >
                {alphabet}
              </AlphabetButton>
            ))}
          </ButtonWrapper>
        </div>
        <UnivsList>
          {/* 선택된 알파벳에 해당하는 학교 리스트 */}
          {filteredUnivs.length > 0 ? (
            filteredUnivs.map((univ) => (
              <InView key={univ.name} threshold={0.1}>
                {({ inView, ref }) => (
                  <Univ ref={ref} visible={inView}>
                    <Link
                      to={{
                        pathname: `/${univ.id}`,
                        state: {
                          univName: univ.name,
                          minimumPrice: minPrice,
                          maximumPrice: maxPrice,
                        },
                      }}
                    >
                      {univ.name}
                    </Link>
                  </Univ>
                )}
              </InView>
            ))
          ) : (
            <NoSelectionMessage visible={true}>
              <HandIcon src={handSrc} alt="Left Hand" />
              학교를 선택해주세요
              <HandIcon src={handSrc} alt="Right Hand" />
            </NoSelectionMessage>
          )}
        </UnivsList>
      </Container>
    </Background>
  );
}

export default Main;
