"use client";

import {OrbitControls} from "@react-three/drei";
import {useFrame} from "@react-three/fiber";
import {useRouter} from "next/navigation";
import {useEffect, useRef} from "react";
import TWEEN from "three/examples/jsm/libs/tween.module.js";
import Planet from "./Planet";

function Planets() {
  const router = useRouter();
  const planetRef = useRef<any[]>([]);

  const planetsData = [
    {name: "Sun", position: [0, 0, 0], scale: [5, 5, 5]},
    {name: "Mercury", position: [4000, 0, 0], scale: [0.38, 0.38, 0.38]},
    {name: "Venus", position: [6000, 0, 0], scale: [0.95, 0.95, 0.95]},
    {name: "Earth", position: [8000, 0, 0], scale: [1, 1, 1]},
    {name: "Mars", position: [10000, 0, 0], scale: [1, 1, 1]},
    {name: "Jupiter", position: [20000, 0, 0], scale: [11.2, 11.2, 11.2]},
    {name: "Saturn", position: [31000, 0, 0], scale: [9.45, 9.45, 9.45]},
    {name: "Uranus", position: [38000, 0, 0], scale: [4, 4, 4]},
    {name: "Neptune", position: [41000, 0, 0], scale: [3.88, 3.88, 3.88]},
  ];

  const revolutionSpeeds = [
    0.02, 0.015, 0.01, 0.008, 0.005, 0.003, 0.002, 0.0015,
  ];

  const revolutionDistances = [
    4000, 6000, 8000, 10000, 20000, 31000, 38000, 41000,
  ];

  planetRef.current.map((object: any, index: number) => {
    if (object.name === "Sun") {
      return;
    }
    const revolutionSpeed = revolutionSpeeds[index];
    const revolutionDistance = revolutionDistances[index];
    const initialAngle = Math.random() * Math.PI * 2; // 초기 각도 랜덤 설정

    new TWEEN.Tween({angle: initialAngle})
      .to({angle: initialAngle + Math.PI * 2}, 10000 / revolutionSpeed) // 10초 동안 1회전
      .easing(TWEEN.Easing.Linear.None) // 선형 이징 사용
      .onUpdate(() => {
        const time = performance.now();
        const angle = initialAngle + (revolutionSpeed * time) / 20;
        const x = Math.cos(angle) * revolutionDistance;
        const z = Math.sin(angle) * revolutionDistance;

        object.position.x = x;
        object.position.y = 0;
        object.position.z = z;
      })
      .repeat(Infinity) // 무한 반복
      .start(); // 애니메이션 시작
  });

  useFrame(() => {
    TWEEN.update();
  });
  console.log("planetRef : ", planetRef);
  useEffect(() => {
    console.log("planetRef : ", planetRef);
  }, []);

  return (
    <>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />

      {/* <Suspense fallback={null}> */}
      {planetsData.map((item: any, index: number) => (
        <Planet
          ref={(el: any) => (planetRef.current[index] = el)}
          key={item.name}
          name={item.name}
          position={item.position}
          scale={item.scale}
        />
      ))}
      {/* </Suspense> */}
    </>
  );
}

export default Planets;
