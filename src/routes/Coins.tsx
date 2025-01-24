import { useQuery } from "react-query";
import { Link, useOutletContext } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import { fetchCoins } from "./api";
import { Helmet } from "react-helmet";
import { darkTheme } from "../theme";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li<{ $isActive: boolean }>`
  background-color: ${(props) =>
    props.$isActive ? props.theme.bgColor : "white"};
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid ${(props) => (props.$isActive ? "white" : "none")};
  a {
    /* display: block; */
    padding: 20px;
    transition: color 0.2s ease-in;
    display: flex;
    align-items: center;
  }

  &:hover {
    /* 현재 선택자에 대한 hover상태라는 뜻 */
    a {
      color: ${(props) => props.theme.accentColor};
      /* 자바스크립트 표현식 삽입할 때 사용하는 구문 (동적인 값 삽입)*/
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;
const Btn = styled.button<{ $isMode: boolean }>`
  height: 10px;
  width: 60px;
  text-align: center;
  border: none;
  border-radius: 20px;
  background-color: ${(props) =>
    props.$isMode ? props.theme.textColor : props.theme.textColor};

  color: ${(props) =>
    props.$isMode ? props.theme.bgColor : props.theme.bgColor};
  &:hover {
    cursor: pointer;
  }
  margin: 10px;
`;

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <Btn
          style={{ height: "20px", border: "none" }}
          $isMode={isDark}
          onClick={toggleDarkAtom}
        >
          {isDark ? "라이트" : "다크"}
        </Btn>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100)?.map((coin) => (
            <Coin key={coin.id} $isActive={true}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img
                  src={`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
              {/* a태그 사용하면 새고로침 되므로 Link사용 */}
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
