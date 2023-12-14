"use client";

import {LoadingState} from "@/utils/atom";
import {OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import Cube from "./Cube";
import Ground from "./Ground";

function MapWrap() {
  const cameraRef = useRef(null);
  const controlRef = useRef(null);
  const [loading, setLoading] = useRecoilState(LoadingState);
  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <Wrap>
      <Canvas shadows>
        <PerspectiveCamera
          ref={cameraRef}
          position={[0, 10, 20]}
          far={10000000}
          makeDefault
        />
        <OrbitControls ref={controlRef} />
        <ambientLight intensity={0.5} />
        <directionalLight intensity={1} position={[5, 5, 5]} castShadow />
        <Ground />
        <Cube controlRef={controlRef} cameraRef={cameraRef} />
      </Canvas>
    </Wrap>
  );
}

export default MapWrap;
const Wrap = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
