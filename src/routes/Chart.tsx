import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import Apexchart from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );
  const mappedOhlcvData = data?.map((data: IHistorical) => ({
    x: data.time_open,
    y: [data.open, data.high, data.low, data.close],
  }));
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <Apexchart
          type="candlestick"
          series={[{ data: mappedOhlcvData }] as unknown as number[]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              type: "candlestick",
              height: 350,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            stroke: {
              curve: "smooth",
              width: 2,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              type: "datetime",
              categories: data?.map((price) => price.time_close),
              labels: {
                style: {
                  colors: "#9c88ff",
                },
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#f31212",
                  downward: "#1e76d4",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
