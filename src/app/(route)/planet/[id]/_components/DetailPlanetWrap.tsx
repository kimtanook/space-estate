"use client";

import {getPlanetPriceData} from "@/utils/api";
import {LoadingState} from "@/utils/atom";
import {planetInfoData} from "@/utils/planetInfo";
import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {format} from "date-fns";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import Chart from "./Chart";
import DetailPlanet from "./DetailPlanet";

function DetailPlanetWrap() {
  const router = useRouter();
  const pathname = usePathname();
  const planetName: string = pathname.split("/planet/")[1];
  const [planetPrice, setPlanetPrice] = useState("");
  const [allDayPrice, setAllDayPrice] = useState<any>([]);
  const [loading, setLoading] = useRecoilState(LoadingState);

  // const {data: datas} = useQuery({
  //   queryKey: ["getSpecificUser"],
  //   queryFn: getPlanetPriceData,
  //   staleTime: 1000,
  // });

  const profileRouter = () => {
    router.push("/profile");
  };

  const infoData: {[key: string]: {[key: string]: string}} = planetInfoData;
  const keys: string[] = Object.keys(infoData[planetName]);
  const infoDiv = () => {
    const infoDiv: any[] = [];
    keys.forEach((key, index) => {
      const value = infoData[planetName][key];
      infoDiv.push(
        <InfoDiv key={index}>
          <InfoKey>{key}</InfoKey> <InfoValue>{value}</InfoValue>
        </InfoDiv>
      );
    });
    return infoDiv;
  };
  let dataArray: any = [];
  const getData = () => {
    getPlanetPriceData().then((response) => {
      response.data.planets.map((item: any) => {
        if (item.name === planetName) {
          setPlanetPrice(item.price);
          if (dataArray.length > 10) {
            dataArray.shift();
            dataArray.push({
              price: item.price,
              date: format(new Date(), "HH:mm:ss"),
            });
          } else {
            dataArray.push({
              price: item.price,
              date: format(new Date(), "HH:mm:ss"),
            });
          }
        }
      });
      setAllDayPrice([...dataArray]);
    });
  };

  useEffect(() => {
    setLoading(false);
    getData();
    setInterval(() => {
      getData();
    }, 5000);
  }, []);

  return (
    <Wrap
      style={{
        background: `url('/stars-map.jpg')`,
      }}
    >
      <Canvas
        camera={{position: [0, 30000, 50000], far: 10000000}}
        style={{
          backgroundSize: "cover",
          position: "fixed",
        }}
      >
        <ambientLight intensity={1} />
        <OrbitControls autoRotate enablePan={false} enableZoom={false} />
        <DetailPlanet />
      </Canvas>
      <PlanetInfo>
        <TopBox>
          <InfoDivBox>
            <InfoDiv>
              <PlanetName>{planetName}</PlanetName>
            </InfoDiv>
            <InfoDiv>
              <InfoKey>price</InfoKey>
              <InfoValue>{planetPrice} million (₩)</InfoValue>
            </InfoDiv>
            <div>{infoDiv()}</div>
          </InfoDivBox>
          <Button onClick={() => router.push(`/map/${planetName}`)}>Map</Button>
          <Button onClick={() => router.push("/profile")}>Profile</Button>
        </TopBox>
        <ChartBox>
          <Chart chartData={allDayPrice} />
        </ChartBox>
      </PlanetInfo>
    </Wrap>
  );
}

export default DetailPlanetWrap;

const Wrap = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
const PlanetInfo = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 40px;
`;
const PlanetName = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: white;
`;
const TopBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;
const InfoDivBox = styled.div``;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  width: 300px;
`;
const Button = styled.button`
  height: 32px;
  width: 80px;
  margin: 0 4px;
  z-index: 1;
`;

const InfoKey = styled.div`
  padding: 4px;
`;
const InfoValue = styled.div`
  margin-left: 20px;
  color: #e6baff;
`;
const ChartBox = styled.div`
  width: 90vw;
  margin: 0 auto;
  /* position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%); */
`;
