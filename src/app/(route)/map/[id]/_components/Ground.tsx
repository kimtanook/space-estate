import {Plane} from "@react-three/drei";
import {DoubleSide} from "three";

function Ground() {
  return (
    <Plane args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
      <meshStandardMaterial opacity={0.5} side={DoubleSide} color="#0fa15d" />
    </Plane>
  );
}

export default Ground;
