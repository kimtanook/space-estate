import {useLoader} from "@react-three/fiber";
import {usePathname} from "next/navigation";
import {useEffect, useRef} from "react";
import {
  Color,
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
} from "three";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js";

function DetailPlanet() {
  const planetRef = useRef<THREE.Object3D>(null);
  const pathname = usePathname();
  const planetName = pathname.split("/planet/")[1];

  const planetModel = useLoader(
    OBJLoader,
    `/space/${planetName}/${planetName}.obj`
  );
  const texture = useLoader(
    TextureLoader,
    `/space/${planetName}/${planetName}_diff.jpg`
  );

  planetModel.traverse((child: THREE.Object3D[]) => {
    if (child instanceof Mesh) {
      child.material.color.set(0xffffff); // 빨간색
      child.material.map = texture;
      child.castShadow = true;
      child.receiveShadow = true;
      child.scale.x = 25;
      child.scale.y = 25;
      child.scale.z = 25;
      child.material.side = DoubleSide;
    }
    if (child instanceof Mesh && child.name === "13913_Sun") {
      child.material = new MeshStandardMaterial({
        map: texture, // 텍스처 설정
        emissive: new Color("#f7c868"), // 형광 빛의 색상
        emissiveIntensity: 0.5, // 형광 빛의 세기
        roughness: 0, // 표면 거칠기 (0: 매우 매끄러움, 1: 거칠게)
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  useEffect(() => {
    planetRef.current?.position.set(0, 0, 0);
  }, []);

  return (
    <>
      <primitive ref={planetRef} object={planetModel} />
    </>
  );
}

export default DetailPlanet;
