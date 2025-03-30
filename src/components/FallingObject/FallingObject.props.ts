import { RefObject } from "react";

export interface IFallingObjectProps {
  url: string;
  position: [number, number, number];
  onCatch: (id: number, bad: boolean) => void;
  onMiss: () => void;
  bad: boolean;
  id: number;
  bucketPositionRef: RefObject<number>;
}
