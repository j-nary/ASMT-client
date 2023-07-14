import { Link } from "react-router-dom";
import styled from "styled-components";
import {RangeSlider} from '../index';
import LogoSrc from '../img/logo.jpg';
import BackgroundSrc from '../img/backimg1.jpg';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 800px;
  margin: 0 auto;
  size: cover;
  height: 100%
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
  background-color: ${(props:any) => props.theme.circle2Color};
  margin-bottom: 10px;
  border-radius: 15px;

  a {
    align-items: center;
    display: flex;
    padding: 20px;
  }
  &:hover {
    a {
      color: ${(props:any) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props:any) => props.theme.circle1Color};
`;

const univs = [
  { name: "서울대학교" },
  { name: "숭실대학교" },
  { name: "중앙대학교" },
];

function Main() {
  return (
    <Background>
      <Container>
        <Header>
          <Logo src={LogoSrc} alt="Logo"/>
          <Title>얼마 쓸래?</Title>
        </Header>
        <RangeSlider/>
        <UnivsList>
          {univs.map((univ) => (
            <Univ key={univ.name}>
              <Link
                to={{
                  pathname: `/${univ.name}`,
                  state: { name: univ.name },
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
