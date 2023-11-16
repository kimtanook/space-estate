import loadingImage from "@/img/icon/loading.png";
import Image from "next/image";
import styled from "styled-components";

function Loading() {
  return (
    <Wrap>
      <Image src={loadingImage} alt="loading-image" width={40} height={40} />
    </Wrap>
  );
}

export default Loading;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
`;
