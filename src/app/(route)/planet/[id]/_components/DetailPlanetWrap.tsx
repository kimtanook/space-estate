"use client";

import {getPlanetPriceData} from "@/utils/api";
import {LoadingState} from "@/utils/atom";
import {planetInfoData} from "@/utils/planetInfo";
import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {format} from "date-fns";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import Chart from "./Chart";
import DetailPlanet from "./DetailPlanet";

function DetailPlanetWrap() {
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

  const infoData: {[key: string]: {[key: string]: string}} = planetInfoData;
  const keys: string[] = Object.keys(infoData[planetName]);
  const infoDiv = () => {
    const infoDiv: any[] = [];
    keys.forEach((key) => {
      const value = infoData[planetName][key];
      infoDiv.push(
        <InfoDiv>
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
    <Wrap>
      <Canvas
        camera={{position: [0, 30000, 50000], far: 10000000}}
        style={{background: `url('/stars-map.jpg')`, backgroundSize: "cover"}}
      >
        <ambientLight intensity={1} />
        <OrbitControls autoRotate enablePan={false} enableZoom={false} />
        <DetailPlanet />
      </Canvas>
      <PlanetInfo>
        <InfoDivBox>
          <InfoDiv>
            <PlanetName>{planetName}</PlanetName>
          </InfoDiv>
          <InfoDiv>
            <InfoKey>price</InfoKey>
            <InfoValue>{planetPrice} million ₩</InfoValue>
          </InfoDiv>
          <div>{infoDiv()}</div>
        </InfoDivBox>
        <ChartBox>
          <Chart chartData={allDayPrice} />
        </ChartBox>
      </PlanetInfo>
    </Wrap>
  );
}

export default DetailPlanetWrap;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;
const PlanetInfo = styled.div``;
const PlanetName = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: white;
`;
const InfoDivBox = styled.div`
  position: absolute;
  top: 20px;
  left: 5%;
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
  width: 300px;
`;
const InfoKey = styled.div`
  padding: 4px;
`;
const InfoValue = styled.div`
  margin-left: 20px;
  color: #ffd4d4;
`;
const ChartBox = styled.div`
  width: 90vw;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0%);
`;
