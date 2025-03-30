import { RefObject } from "react";

export interface IBucketProps {
  position: [number, number, number];
  setBucketX: (x: number) => void;
  bucketPositionRef: RefObject<number>;
}
