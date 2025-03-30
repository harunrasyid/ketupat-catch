import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Bucket, FallingObject, IFallingObjectProps } from "@/components";

function App() {
  const [score, setScore] = useState<number>(0);
  const [bucketX, setBucketX] = useState<number>(0);
  const [fallingObjects, setFallingObjects] = useState<IFallingObjectProps[]>(
    [],
  );
  const [nextObject, setNextObject] = useState<IFallingObjectProps | null>(
    null,
  );

  const bucketPositionRef = useRef(0);

  const spawnNextObject = () => {
    const isBad = Math.random() > 0.5;
    const objectUrl = isBad ? "/bad.glb" : "/good.glb";
    const startX = Math.random() * (20 - 2 * 3) - (10 - 3);

    setNextObject({
      id: Date.now(),
      url: objectUrl,
      position: [startX, 5, 0],
      onCatch: handleCatch,
      onMiss: handleMiss,
      bad: isBad,
      bucketPositionRef,
    });
  };

  useEffect(() => {
    spawnNextObject();
  }, []);

  useEffect(() => {
    if (nextObject) {
      setFallingObjects([nextObject]);
    }
  }, [nextObject]);

  const handleCatch = (id: number, bad: boolean) => {
    setScore((prev) => prev + (bad ? -1 : 1));
    setFallingObjects([]);

    setTimeout(() => {
      const isBad = Math.random() > 0.5;
      const objectUrl = isBad ? "/bad.glb" : "/good.glb";
      const startX = Math.random() * (20 - 2 * 3) - (10 - 3);

      setNextObject({
        id: Date.now(),
        url: objectUrl,
        position: [startX, 5, 0],
        onCatch: handleCatch,
        onMiss: handleMiss,
        bad: isBad,
        bucketPositionRef,
      });
    }, 2000);
  };

  const handleMiss = () => {
    setFallingObjects([]);

    setTimeout(() => {
      const isBad = Math.random() > 0.5;
      const objectUrl = isBad ? "/bad.glb" : "/good.glb";
      const startX = Math.random() * (20 - 2 * 3) - (10 - 3);

      setNextObject({
        id: Date.now(),
        url: objectUrl,
        position: [startX, 5, 0],
        onCatch: handleCatch,
        bad: isBad,
        bucketPositionRef,
        onMiss: handleMiss,
      });
    }, 2000);
  };

  return (
    <div>
      <div className="greeting-score">
        <h1 className={"greeting"}>Eid Mubarak!</h1>
        <span className={"score"}>Catch Ketupat, Not Your Work Bro </span>
        <h2 className={"score"}>
          score {score} (
          {score < 0
            ? "Bro You Prioritize Work Over Eid? 😭"
            : "Get that thicc ketupat bro"}
          )
        </h2>
      </div>
      <Canvas
        camera={{ position: [0, 2, 12] }}
        scene={{ background: new THREE.Color("white") }}
        style={{
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />

        {/* Bucket & Falling Obj */}
        <Physics>
          <Bucket
            position={[bucketX, -5, 0]}
            setBucketX={setBucketX}
            bucketPositionRef={bucketPositionRef}
          />

          {fallingObjects.map((props, index) => (
            <FallingObject key={index} {...props} />
          ))}
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
