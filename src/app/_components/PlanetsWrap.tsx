"use client";

import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {useRef} from "react";
import styled from "styled-components";
import Planets from "./Planets";
import TopMenu from "./_menu/TopMenu";

function PlanetsWrap() {
  const canvasRef = useRef(null);

  return (
    <Wrap>
      <Canvas
        ref={canvasRef}
        camera={{position: [0, 30000, 50000], far: 10000000}}
        style={{background: `url('/stars-map.jpg')`, backgroundSize: "cover"}}
      >
        <pointLight
          color="#ffb53e"
          intensity={10}
          position={[2, 0, 5]}
          castShadow={true}
          receiveShadow={true}
          distance={0}
          decay={0}
        />
        <ambientLight intensity={0.4} />
        <OrbitControls enablePan={false} />
        <Planets />
      </Canvas>
      <TopMenu />
    </Wrap>
  );
}

export default PlanetsWrap;
const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
`;
const Button = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 40px;
  background-color: aqua;
  z-index: 1;
`;
