//         X
//         |
//         |
//         |
//         |
//         +-------------- Y
//        /
//       /
//      /
//     Z

export type Position = {
  positionBottom?: number; // -X
  positionIn?: number; // -Z
  positionLeft?: number; // -Y
  positionOut?: number; // +Z
  positionRight?: number; // +Y
  positionTop?: number; // +X
};

export function toPosition({
  positionBottom = 0,
  positionIn = 0,
  positionLeft = 0,
  positionOut = 0,
  positionRight = 0,
  positionTop = 0,
}: Position): [number, number, number] {
  return [
    positionRight - positionLeft,
    positionTop - positionBottom,
    positionOut - positionIn,
  ];
}
