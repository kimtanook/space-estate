"use cline";

import loadingImage from "@/img/icon/loading.png";
import Image from "next/image";
import styled, {keyframes} from "styled-components";

function Loading() {
  return (
    <Wrap>
      <ImageBox src={loadingImage} alt="loading-image" width={40} height={40} />
    </Wrap>
  );
}

export default Loading;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Wrap = styled.div`
  z-index: 10;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;

const ImageBox = styled(Image)`
  animation: ${rotateAnimation} 2s linear infinite;
`;
