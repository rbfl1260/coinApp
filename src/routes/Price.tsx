import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";
import styled from "styled-components";

interface Charprops {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: number;
  market_cap: number;
}

const PriceDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 50px;
  line-height: 22px;
`;
export function Price() {
  const { coinId } = useOutletContext<Charprops>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading prcie..."
      ) : (
        <div>
          {data?.map((price) => (
            <PriceDiv>
              <span style={{ textAlign: "center" }}>high: {price.high}</span>
              <span style={{ textAlign: "center" }}>low: {price.low}</span>
            </PriceDiv>
          ))}
        </div>
      )}
    </div>
  );
}
