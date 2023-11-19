"use client";

import {getPlanetPriceData} from "@/utils/api";
import {planetInfoData} from "@/utils/planetInfo";
import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import styled from "styled-components";
import Chart from "./Chart";
import DetailPlanet from "./DetailPlanet";

function DetailPlanetWrap() {
  const pathname = usePathname();
  const planetName: string = pathname.split("/planet/")[1];
  const [planetPrice, setPlanetPrice] = useState("");
  const [allDayPrice, setAllDayPrice] = useState<any>(["price"]);

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
  const getData = () => {
    getPlanetPriceData().then((response) => {
      response.data.planets.map((item: any) => {
        if (item.name === planetName) {
          setPlanetPrice(item.price);
          setAllDayPrice((prev: any) => [...prev, item.price]);
        }
      });
    });
  };

  useEffect(() => {
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
        <OrbitControls autoRotate />
        <DetailPlanet />
      </Canvas>
      <PlanetInfo>
        <div>
          <InfoDiv>
            <PlanetName>{planetName}</PlanetName>
          </InfoDiv>
          <InfoDiv>
            <InfoKey>price</InfoKey>
            <InfoValue>{planetPrice} million ₩</InfoValue>
          </InfoDiv>
          <div>{infoDiv()}</div>
        </div>
        <div>
          <Chart chartData={allDayPrice} />
        </div>
      </PlanetInfo>
    </Wrap>
  );
}

export default DetailPlanetWrap;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PlanetInfo = styled.div`
  position: absolute;
  top: 20px;
  margin: 20px;
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const PlanetName = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: white;
`;
const InfoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
`;
const InfoKey = styled.div`
  padding: 4px;
`;
const InfoValue = styled.div`
  margin-left: 20px;
  color: #ffd4d4;
`;
