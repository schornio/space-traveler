import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { LaserProps } from "../components/3DModels/Laser";
import { fromPixelsToMeters } from "../utils/fromPixelsToMeters";
import { useGameStore } from "../store/useGameStore";

export function useSpaceship() {
  const spaceshipRef = useGameStore((state) => state.spaceship.ref);
  const speed = 1;
  const [movement, setMovement] = useState({
    up: false,
    down: false,
    left: false,
    right: false,
  });
  const [lasers, setLasers] = useState<LaserProps[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          setMovement((m) => ({ ...m, up: true }));
          break;
        case "s":
          setMovement((m) => ({ ...m, down: true }));
          break;
        case "a":
          setMovement((m) => ({ ...m, left: true }));
          break;
        case "d":
          setMovement((m) => ({ ...m, right: true }));
          break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          setMovement((m) => ({ ...m, up: false }));
          break;
        case "s":
          setMovement((m) => ({ ...m, down: false }));
          break;
        case "a":
          setMovement((m) => ({ ...m, left: false }));
          break;
        case "d":
          setMovement((m) => ({ ...m, right: false }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    if (spaceshipRef.current) {
      const delta = speed / 10;
      let newPositionY = spaceshipRef.current.position.y;
      let newPositionX = spaceshipRef.current.position.x;

      if (movement.up) {
        newPositionY += delta;
      }
      if (movement.down) {
        newPositionY -= delta;
      }
      if (movement.left) {
        newPositionX -= delta;
      }
      if (movement.right) {
        newPositionX += delta;
      }

      const windowHalfX = fromPixelsToMeters(window.innerWidth / 2);
      const windowHalfY = fromPixelsToMeters(window.innerHeight / 2);

      newPositionX = Math.max(
        -windowHalfX,
        Math.min(windowHalfX, newPositionX)
      );
      newPositionY = Math.max(
        -windowHalfY,
        Math.min(windowHalfY, newPositionY)
      );

      spaceshipRef.current.position.y = newPositionY;
      spaceshipRef.current.position.x = newPositionX;
    }
  });

  useEffect(() => {
    const fireLaser = (e: KeyboardEvent) => {
      if (e.code === "Space" && spaceshipRef.current) {
        const currentPosition = spaceshipRef.current.position;
        spaceshipRef.current.getWorldPosition(currentPosition);

        setLasers((lasers) => [
          ...lasers,
          {
            id: `laser-${lasers.length}`,
            position: currentPosition,
          },
        ]);
      }
    };

    window.addEventListener("keydown", fireLaser);

    return () => window.removeEventListener("keydown", fireLaser);
  }, []);

  return lasers;
}
