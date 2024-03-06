import { Display, DisplayProps } from "../Display";
import { useCountdown } from "./useCountdown";

type CountdownProps = {
  initialSeconds: number;
  onCountdownEnd: () => void;
  visible?: boolean;
} & DisplayProps;

export function Countdown({
  initialSeconds,
  onCountdownEnd,
  visible = true,
  ...props
}: CountdownProps) {
  const { secondsLeft } = useCountdown(initialSeconds, onCountdownEnd);

  return visible ? <Display {...props} text={secondsLeft} /> : null;
}
