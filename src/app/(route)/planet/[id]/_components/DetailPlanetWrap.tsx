"use client";

import {getPlanetPriceData} from "@/utils/api";
import {planetInfoData} from "@/utils/planetInfo";
import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import styled from "styled-components";
import DetailPlanet from "./DetailPlanet";

function DetailPlanetWrap() {
  const pathname = usePathname();
  const planetName: string = pathname.split("/planet/")[1];
  const [planetPrice, setPlanetPrice] = useState({}) as any;

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

  setTimeout(() => {
    getPlanetPriceData().then((response) => {
      response.data.planets.map((item: any) => {
        item.name === planetName && setPlanetPrice(item);
      });
    });
  }, 60000);

  useEffect(() => {
    getPlanetPriceData().then((response) => {
      response.data.planets.map((item: any) => {
        item.name === planetName && setPlanetPrice(item);
      });
    });
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
        <InfoDiv>
          <PlanetName>{planetPrice.name}</PlanetName>
        </InfoDiv>
        <InfoDiv>
          <InfoKey>price</InfoKey>
          <InfoValue>{planetPrice.price}₩</InfoValue>
        </InfoDiv>
        <div>{infoDiv()}</div>
      </PlanetInfo>
    </Wrap>
  );
}

export default DetailPlanetWrap;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
`;
const PlanetInfo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 300px;
  height: 400px;
`;
const PlanetName = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: white;
`;
const InfoDiv = styled.div`
  margin: 12px 4px;
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
