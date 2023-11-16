import {LoadingState, hoverPlanetState} from "@/utils/atom";
import {useFrame, useLoader} from "@react-three/fiber";
import {useRouter} from "next/navigation";
import {memo, useEffect, useRef} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import * as THREE from "three";
import {Mesh, Object3D, TextureLoader} from "three";
import TWEEN from "three/examples/jsm/libs/tween.module.js";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader.js";
import Loading from "./Loading";

function Planet({
  name,
  position,
  scale,
  revolutionSpeeds,
  revolutionDistances,
}: any) {
  const router = useRouter();

  const planetRef = useRef<Object3D>();

  const [loading, setLoading] = useRecoilState(LoadingState);

  const hoverPlanet = useRecoilValue(hoverPlanetState);

  const planetModel = useLoader(OBJLoader, `/space/${name}/${name}.obj`);
  const texture = useLoader(TextureLoader, `/space/${name}/${name}_diff.jpg`);

  const revolutionSpeed = revolutionSpeeds;
  const revolutionDistance = revolutionDistances;

  const detailPlanet = () => {
    if (name === "Sun") {
      return;
    }
    router.push(`/planet/${name}`);
  };

  useEffect(() => {
    const initialAngle = Math.random() * Math.PI * 2; // 초기 각도 랜덤
    new TWEEN.Tween({angle: initialAngle})
      .to({angle: initialAngle + Math.PI * 2}, 10000 / revolutionSpeed)
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(() => {
        const time = performance.now();
        const angle = initialAngle + (revolutionSpeed * time) / 20;
        const x = Math.cos(angle) * revolutionDistance;
        const z = Math.sin(angle) * revolutionDistance;

        planetRef.current?.position.set(x, 0, z);
      })

      .start();
  }, []);

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.001;
    }
    TWEEN.update();
  });
  useEffect(() => {
    // 모델에 텍스처를 입힙니다.
    planetModel?.traverse((child: THREE.Object3D) => {
      if (child instanceof Mesh) {
        child.material.color.set(0xffffff);
        child.material.map = texture;
        child.castShadow = true;
        child.receiveShadow = true;
        child.scale.x = scale[0];
        child.scale.y = scale[1];
        child.scale.z = scale[2];
      }
      if (child instanceof Mesh && name === hoverPlanet) {
        child.material.color.set("#ffaefe"); // 빨간색
        child.material.map = texture;
        child.castShadow = true;
        child.receiveShadow = true;
        child.scale.x = scale[0] * 1.2;
        child.scale.y = scale[1] * 1.2;
        child.scale.z = scale[2] * 1.2;
      }

      if (child instanceof Mesh && child.name === "13913_Sun") {
        child.material = new THREE.MeshStandardMaterial({
          map: texture, // 텍스처 설정
          emissive: new THREE.Color("#f7c868"), // 형광 빛의 색상
          emissiveIntensity: 0.5, // 형광 빛의 세기
          roughness: 0, // 표면 거칠기 (0: 매우 매끄러움, 1: 거칠게)
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [hoverPlanet]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    <Loading />;
  }

  return (
    <primitive
      onClick={detailPlanet}
      ref={planetRef}
      object={planetModel}
      position={position}
    />
  );
}
export default memo(Planet);
