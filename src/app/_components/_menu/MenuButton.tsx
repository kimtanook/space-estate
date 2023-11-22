import {LoadingState, hoverPlanetState} from "@/utils/atom";
import {useRouter} from "next/navigation";
import {useRecoilState} from "recoil";
import styled from "styled-components";

function MenuButton({item}: any) {
  const router = useRouter();
  const [loading, setLoading] = useRecoilState(LoadingState);
  const [hoverItem, setHoverItem] = useRecoilState(hoverPlanetState);

  const onHover = () => {
    setHoverItem(item.name);
  };
  const outHover = () => {
    setHoverItem("");
  };

  const onClickPlanetDetail = () => {
    setLoading(true);
    router.push(`/planet/${item.name}`);
  };

  return (
    <Button
      onClick={onClickPlanetDetail}
      onMouseOver={onHover}
      onMouseLeave={outHover}
    >
      {item.name}
    </Button>
  );
}

export default MenuButton;

const Button = styled.button`
  background-color: black;
  color: white;
  border: 1px solid #c8c8c8;
  border-radius: 8px;
  width: 80px;
  height: 40px;
  margin: 12px;
  transition: 0.3s;
  &:hover {
    background-color: white;
    color: black;
    transition: 0.3s;
  }
`;
