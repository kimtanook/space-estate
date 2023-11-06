"use client";

import {rotateState} from "@/utils/atom";
import {planetData} from "@/utils/planetData";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import MenuButton from "./MenuButton";

function TopMenu() {
  const data = planetData;

  const [rotate, setRotate] = useRecoilState(rotateState);

  return (
    <Wrap>
      <button onClick={() => setRotate(!rotate)}>회전</button>
      <Box>
        {data.map((item: any, index: number) => (
          <MenuButton key={index} item={item} />
        ))}
      </Box>
    </Wrap>
  );
}

export default TopMenu;

const Wrap = styled.div`
  width: 80vw;
  height: 120px;
  background-color: aqua;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: scroll;
`;
const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
