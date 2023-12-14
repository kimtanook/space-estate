import {Color3, Vector3} from "@babylonjs/core";
import {useEffect, useRef, useState} from "react";
import {useBeforeRender, useClick, useHover} from "react-babylonjs";

function Cube({controlRef, cameraRef}: any) {
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [zPosition, setZPosition] = useState(0);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "w") {
      setZPosition((prev) => prev - 1);
    }
    if (event.key === "s") {
      setZPosition((prev) => prev + 1);
    }
    if (event.key === "a") {
      setXPosition((prev) => prev + 1);
    }
    if (event.key === "d") {
      setXPosition((prev) => prev - 1);
    }
    if (event.code === "Space") {
      setYPosition(2);
      setTimeout(() => {
        setYPosition(0.6);
      }, 100);
    }
  };

  const DefaultScale = new Vector3(1, 1, 1);
  const BiggerScale = new Vector3(1.25, 1.25, 1.25);
  const prevMovePosition = new Vector3(2, 2, 2);
  const nextMovePosition = new Vector3(2, 2, 2);
  // access Babylon scene objects with same React hook as regular DOM elements
  const boxRef = useRef<any>(null);

  const [clicked, setClicked] = useState(false);
  useClick(() => setClicked((clicked) => !clicked), boxRef);

  const [hovered, setHovered] = useState(false);
  useHover(
    () => setHovered(true),
    () => setHovered(false),
    boxRef
  );

  // This will rotate the box on every Babylon frame.
  const rpm = 5;
  useBeforeRender((scene) => {
    if (boxRef.current) {
      // Delta time smoothes the animation.
      var deltaTimeInMillis = scene.getEngine().getDeltaTime();
      boxRef.current.rotation.y +=
        (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <box
      name={`asd`}
      ref={boxRef}
      size={2}
      position={new Vector3(xPosition, yPosition, zPosition)}
      scaling={clicked ? BiggerScale : DefaultScale}
    >
      <standardMaterial
        name={`asd`}
        diffuseColor={hovered ? Color3.Black() : Color3.White()}
        specularColor={Color3.Black()}
      />
    </box>
  );
}

export default Cube;
