import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { IFallingObjectProps } from "./FallingObject.props";

export const FallingObject = ({
  url,
  onCatch,
  onMiss,
  position,
  id,
  bad,
  bucketPositionRef,
}: IFallingObjectProps) => {
  const { scene } = useGLTF(url);
  const ref = useRef<any | null>(null);

  useFrame(() => {
    if (!ref.current) return;

    const objectPosition = ref.current.translation();
    const bucketX = bucketPositionRef.current; // Access bucket's X position

    // Check if object reaches bottom
    if (objectPosition.y < -5) {
      onMiss();
    }

    // Check if object is inside bucket range (collision detection)
    const isWithinBucketX = Math.abs(objectPosition.x - bucketX) < 1; // Adjust threshold for accuracy
    const isTouchingBucket = objectPosition.y < -1.5; // Adjust based on bucket size

    if (isWithinBucketX && isTouchingBucket) {
      onCatch(id, bad);
    }
  });

  return (
    <RigidBody
      ref={ref}
      position={position}
      gravityScale={1}
      colliders="cuboid"
    >
      <primitive object={scene} scale={bad ? 1 : 23} />
    </RigidBody>
  );
};
