"use client";

import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import styled from "styled-components";
import DetailPlanet from "./DetailPlanet";

function DetailPlanetWrap() {
  return (
    <Wrap>
      <Canvas
        camera={{position: [0, 30000, 50000], far: 10000000}}
        style={{background: `url('/stars-map.jpg')`, backgroundSize: "cover"}}
      >
        <ambientLight intensity={0.4} />
        <OrbitControls />
        <DetailPlanet />
      </Canvas>
    </Wrap>
  );
}

export default DetailPlanetWrap;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
`;
