import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { IBucketProps } from "./Bucket.props";

export const Bucket = ({
  position,
  setBucketX,
  bucketPositionRef,
}: IBucketProps) => {
  const { scene } = useGLTF("/bucket.glb");
  const ref = useRef<any | null>(null);

  const targetX = useRef(position[0]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 20 - 10;
      targetX.current = Math.max(-10, Math.min(10, x));
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      const x = (touch.clientX / window.innerWidth) * 20 - 10;
      targetX.current = Math.max(-10, Math.min(10, x));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useFrame(() => {
    if (ref.current) {
      position[0] += (targetX.current - position[0]) * 0.1;
      ref.current.setTranslation({
        x: position[0],
        y: position[1],
        z: position[2],
      });
      setBucketX(position[0]);

      // Store bucket position globally
      bucketPositionRef.current = position[0];
    }
  });

  return (
    <RigidBody
      ref={ref}
      position={position}
      type="kinematicPosition"
      name="bucket"
      sensor
    >
      <primitive object={scene} scale={0.5} />
    </RigidBody>
  );
};
