import { Link } from "react-router-dom";
import styled from "styled-components";
import RangeSlider from "../Components/RangeSlider";
import LogoSrc from "../Assets/Img/logo.jpg";
import BackgroundSrc from "../Assets/Img/backimg3.jpg";
import { useState } from "react";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 800px;
  margin: 0 auto;
  size: cover;
  height: 100%;
`;

// TODO: Background 수정 필요
const Background = styled.div`
  background-image: url(${BackgroundSrc});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100%;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5vh;
`;

const Logo = styled.img`
  height: 12vh;
  display: flex;
  margin: 5vh;
`;

const UnivsList = styled.ul``;

const Univ = styled.li`
  background-color: ${(props: any) => props.theme.circle2Color};
  margin-bottom: 10px;
  border-radius: 15px;

  a {
    align-items: center;
    display: flex;
    padding: 20px;
  }
  &:hover {
    a {
      color: white;
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props: any) => props.theme.circle1Color};
`;

const univs = [
  { name: "가톨릭대학교", id: "catholic" },
  { name: "강서대학교", id: "kcu" },
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

function Main() {
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(100000);
  return (
    <Background>
      <Container>
        <Header>
          <Logo src={LogoSrc} alt="Logo" />
          <Title>얼마 쓸래?</Title>
        </Header>
        <RangeSlider />
        <UnivsList>
          {univs.map((univ) => (
            <Univ key={univ.name}>
              <Link
                to={{
                  pathname: `/${univ.id}`,
                  state: { univName: univ.name, minumumPrice: minPrice, maximumPrice: maxPrice},
                }}
              >
                {univ.name} &rarr;
              </Link>
            </Univ>
          ))}
        </UnivsList>
      </Container>
    </Background>
  );
}
export default Main;
