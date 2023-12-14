"use client";

import {Vector3} from "@babylonjs/core";
import {Engine, Scene} from "react-babylonjs";
import styled from "styled-components";

import Cube from "./Cube2";

function MapWrap() {
  return (
    <Engine antialias adaptToDeviceRatio canvasId="babylonJS">
      <Scene>
        <arcRotateCamera
          name="camera1"
          target={Vector3.Zero()}
          alpha={Math.PI / 2}
          beta={Math.PI / 4}
          radius={8}
        />
        <hemisphericLight
          name="light1"
          intensity={0.7}
          direction={Vector3.Up()}
        />
        <Cube />
      </Scene>
    </Engine>
  );
}

export default MapWrap;
const Wrap = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
