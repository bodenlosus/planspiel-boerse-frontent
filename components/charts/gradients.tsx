export interface gradientInterface {
  id: string;
  color: string;
  opacity: {
    start: number;
    end: number;
  };
}

export function Gradient({ id, color, opacity }: gradientInterface) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={color} stopOpacity={opacity.start} />
      <stop offset="95%" stopColor={color} stopOpacity={opacity.end} />
    </linearGradient>
  );
}