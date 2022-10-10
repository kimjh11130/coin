import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  max-width: 480px;
  row-gap: 10px;
`;

const PriceItem = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
  color: ${(props) => props.theme.accentColor};
`;

const PriceInfo = styled.span`
  color: white;
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface PriceProps {
  coinId: string;
}

interface YangsuProps {
  children: number;
}
const Yangsu = ({ children }: YangsuProps) => {
  const [yang, setYang] = useState("green");
  children > 0 ? setYang("green") : setYang("red");
  return <span color={yang}>{children}</span>;
};

const Price = ({ coinId }: PriceProps) => {
  const { isLoading, data } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 10000,
    }
  );

  return (
    <>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <Container>
          <PriceItem>
            <PriceInfo>Price:</PriceInfo>
            {data?.quotes.USD.price}$
          </PriceItem>
          <PriceItem>
            <PriceInfo>Max Change rate in last 24h:</PriceInfo>
            {data?.quotes.USD.market_cap_change_24h}%
          </PriceItem>
          <PriceItem>
            <PriceInfo>Change rate(15m):</PriceInfo>
            {data?.quotes.USD.percent_change_15m}%
          </PriceItem>
          <PriceItem>
            <PriceInfo>Change rate(30m):</PriceInfo>
            {data?.quotes.USD.percent_change_30m}%
          </PriceItem>
          <PriceItem>
            <PriceInfo>Change rate(1h):</PriceInfo>
            {data?.quotes.USD.percent_change_1h}%
          </PriceItem>
          <PriceItem>
            <PriceInfo>Change rate(24h):</PriceInfo>
            {data?.quotes.USD.percent_change_24h}%
          </PriceItem>
        </Container>
      )}
    </>
  );
};

export default Price;
