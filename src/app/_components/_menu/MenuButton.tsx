import {hoverPlanetState} from "@/utils/atom";
import {useRecoilState} from "recoil";
import styled from "styled-components";

function MenuButton({item}: any) {
  const [hoverItem, setHoverItem] = useRecoilState(hoverPlanetState);
  console.log("hoverItem : ", hoverItem);
  const onHover = () => {
    setHoverItem(item.name);
  };
  const outHover = () => {
    setHoverItem("");
  };
  return (
    <Button onMouseOver={onHover} onMouseLeave={outHover}>
      {item.name}
    </Button>
  );
}

export default MenuButton;

const Button = styled.button`
  background-color: red;
  width: 80px;
  height: 40px;
  margin: 12px;
`;
