import c3 from "c3";
import "c3/c3.css"; // c3.js의 CSS 스타일을 가져옵니다.
import {format} from "date-fns";
import {useEffect} from "react";
import styled from "styled-components";

function Chart({chartData}: any) {
  const priceData = chartData.map((item: any) => item.price);
  const dateData = chartData.map((item: any) => item.date);
  const data: any = {
    // 그래프를 그리기 위한 데이터 (여기서는 최저/최고/평균)
    columns: [["price", ...priceData]],
    // 각 데이터의 type을 지정
    types: {
      // 최저, 최고의 경우 line 차트, 평균의 경우 bar 차트로 지정
      price: "line",
    },
  };
  useEffect(() => {
    const chart = c3.generate({
      data: data,
      bindto: "#chart", // 그래프를 렌더링할 DOM 요소
      axis: {
        // X 축과 Y축에 대한 설정
        x: {
          label: "Date", // X 축의 라벨
          type: "category",
          categories: dateData, // 데이터의 이름
        },
        y: {
          label: "Price(million)", // y 축의 라벨
        },
      },
      size: {
        // 차트의 가로 및 세로 길이 지정
        height: 260,
      },
    });
    return () => {
      chart.destroy();
    };
  }, [chartData]);

  return (
    <div>
      <DateBox>{format(new Date(), "yyyy.MM.dd")}</DateBox>
      <ChartWrap id="chart" style={{color: "white"}}></ChartWrap>
    </div>
  );
}

export default Chart;

const DateBox = styled.div`
  display: flex;
  justify-content: end;
`;
const ChartWrap = styled.div``;
