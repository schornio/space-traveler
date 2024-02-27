import { Box3, Object3D } from "three";

export function checkCollision(elementOne: Object3D, elementTwo: Object3D) {
  const boxOne = new Box3().setFromObject(elementOne);
  const boxTwo = new Box3().setFromObject(elementTwo);
  return boxOne.intersectsBox(boxTwo);
}
