import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import { useOutletContext } from "react-router-dom";
import ApexChart from "react-apexcharts";
import { useTheme } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
export function Chart() {
  const theme = useTheme();
  const { coinId } = useOutletContext<Charprops>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              name: "Price",
              data:
                data?.map((price) => ({
                  x: new Date(price.time_close * 1000).toUTCString(),
                  y: [
                    parseFloat(price.open),
                    parseFloat(price.high),
                    parseFloat(price.low),
                    parseFloat(price.close),
                  ],
                })) ?? [],
              color: theme.accentColor,
            },
          ]}
          options={{
            chart: {
              type: "candlestick",
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            theme: { mode: isDark ? "dark" : "light" },
            stroke: { curve: "smooth" },
            yaxis: { labels: { show: false } },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toUTCString()
              ),
            },

            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#0be881",
                  downward: "#0fbcf9",
                },
                wick: {
                  useFillColor: true,
                },
              },
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
