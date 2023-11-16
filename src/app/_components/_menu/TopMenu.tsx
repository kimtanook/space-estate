"use client";

import {planetData} from "@/utils/planetData";
import styled from "styled-components";
import MenuButton from "./MenuButton";

function TopMenu() {
  const data = planetData;
  const sliceData = data.slice(1);
  return (
    <Wrap>
      <Box>
        {sliceData.map((item: any, index: number) => (
          <MenuButton key={index} item={item} />
        ))}
      </Box>
    </Wrap>
  );
}

export default TopMenu;

const Wrap = styled.div`
  width: 80vw;
  max-width: 1000px;
  border-radius: 12px;
  position: absolute;
  top: 0px;
  left: 50%;
  transform: translate(-50%, 0%);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  overflow-x: scroll;
  &:hover {
    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #ffffff; /* 스크롤바의 색상 */
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: none; /*스크롤바 뒷 배경 색상*/
    }
  }
`;
const Box = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: auto;
`;
