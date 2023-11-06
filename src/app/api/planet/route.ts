import {NextResponse} from "next/server";

// 초기 행성 데이터
let planetsData = {
  planets: [
    {name: "수성", price: 20000},
    {name: "금성", price: 10000},
    {name: "지구", price: 12000},
    {name: "화성", price: 34000},
    {name: "목성", price: 13000},
    {name: "토성", price: 15000},
    {name: "천왕성", price: 9000},
    {name: "해왕성", price: 2000},
  ],
};

// 1분(60초)마다 가격을 수정하는 타이머 설정
setInterval(() => {
  // 각 행성의 가격을 10% 증가 또는 감소시킴
  planetsData.planets.forEach((planet) => {
    // 50% 확률로 가격을 10% 증가시키거나 감소시킴
    if (Math.random() < 0.5) {
      planet.price *= 1.1; // 10% 증가
    } else {
      planet.price *= 0.9; // 10% 감소
    }
  });
}, 60000); // 1분(60초)마다 실행

export async function GET() {
  return NextResponse.json({data: planetsData});
}

export async function POST(request: Request) {
  const res = await request.json();
  return NextResponse.json({res});
}
