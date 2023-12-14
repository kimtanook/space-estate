import {useFrame, useLoader} from "@react-three/fiber";
import {useEffect, useRef, useState} from "react";
import {AnimationClip, AnimationMixer, Mesh} from "three";
import TWEEN from "three/examples/jsm/libs/tween.module.js";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader.js";

function Cube({controlRef, cameraRef}: any) {
  const boxRef = useRef<Mesh>(null);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [zPosition, setZPosition] = useState(0);
  const [useRunningAnimation, setUseRunningAnimation] = useState(false); // Added state variable
  const humanModel = useLoader(
    FBXLoader,
    useRunningAnimation ? "/space/emily_running.fbx" : "/space/emily_idle.fbx"
  );
  const mixer = useRef<AnimationMixer>();
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "w") {
      setZPosition((prev) => prev - 1);
    }
    if (event.key === "s") {
      setZPosition((prev) => prev + 1);
    }
    if (event.key === "a") {
      setXPosition((prev) => prev - 1);
    }
    if (event.key === "d") {
      setXPosition((prev) => prev + 1);
    }
    if (event.code === "Space") {
      setYPosition(2);
      setTimeout(() => {
        setYPosition(0.6);
      }, 100);
    }
    setUseRunningAnimation(true);
  };
  const handleKeyUp = () => {
    setUseRunningAnimation(false); // Set to false when no keys are pressed
  };

  if (boxRef.current) {
    new TWEEN.Tween(boxRef.current.position)
      .to(
        {
          x: xPosition,
          y: yPosition,
          z: zPosition,
        },
        100
      )
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(() => {})
      .start();
  }
  if (boxRef.current) {
    new TWEEN.Tween(cameraRef.current.position)
      .to(
        {
          x: xPosition,
          z: zPosition + 20,
        },
        100
      )
      .easing(TWEEN.Easing.Linear.None)
      .onUpdate(() => {})
      .start();
  }
  useFrame(() => {
    TWEEN.update();

    cameraRef.current.lookAt(boxRef.current?.position);
    cameraRef.current.rotation.set(-0.2, 0, 0);
  });
  useFrame((state, delta) => {
    // Update the animation mixer on each frame
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  useEffect(() => {
    if (humanModel) {
      mixer.current = new AnimationMixer(humanModel);
      const action = mixer.current.clipAction(
        humanModel.animations[0] as AnimationClip
      ); // Assuming the first animation
      action.play();

      return () => {
        // Cleanup on unmount
        if (mixer.current) {
          mixer.current.stopAllAction();
          mixer.current = undefined;
        }
      };
    }
  }, [humanModel]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return <primitive ref={boxRef} object={humanModel} scale={0.02} />;
}

export default Cube;
