import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 800px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
    <Container>
      <Header>
        <Title>얼마쓸래?</Title>
      </Header>

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
  );
}
export default Main;
