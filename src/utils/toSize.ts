export type Size = {
  sizeWidth?: number;
  sizeHeight?: number;
  sizeDepth?: number;
};

export function toSize({
  sizeWidth = 1,
  sizeHeight = 1,
  sizeDepth = 1,
}: Size): [number, number, number] {
  return [sizeWidth, sizeHeight, sizeDepth];
}
