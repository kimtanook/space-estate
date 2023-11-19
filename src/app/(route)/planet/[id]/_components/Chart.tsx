import c3 from "c3";
import "c3/c3.css"; // c3.js의 CSS 스타일을 가져옵니다.
import {useEffect} from "react";
import styled from "styled-components";

function Chart({chartData}: any) {
  const data: any = {
    // 그래프를 그리기 위한 데이터 (여기서는 최저/최고/평균)
    columns: [chartData],
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
          categories: chartData.map((item: any, index: number) => index), // 데이터의 이름
        },
        y: {
          label: "Price(million)", // y 축의 라벨
        },
      },
    });
    return () => {
      chart.destroy();
    };
  }, [chartData]);

  return (
    <div>
      <ChartWrap id="chart" style={{color: "white"}}></ChartWrap>
    </div>
  );
}

export default Chart;

const ChartWrap = styled.div``;
