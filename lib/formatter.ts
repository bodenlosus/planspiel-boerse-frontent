import { StockPrice } from "@/database/custom_types";

export function formatter(data: Array<StockPrice>) {
  return data.map((price) => ({
    ...price,
    ...formatFloatingPoints(price),
    timestamp: formatTimeStamp(price.timestamp),
  }));
}

const formatFloatingPoints = (price: StockPrice) => ({
  open: formatFloatingPoint(price.open, 2),
  close: formatFloatingPoint(price.close, 2),
  high: formatFloatingPoint(price.high, 2),
  low: formatFloatingPoint(price.low, 2),
});
const formatFloatingPoint = (
  value: number | null,
  digits: number
): number | null => {
  if (!value) {
    return null;
  }
  const factor = Math.pow(10, digits);
  const integerPart = Math.floor(value);
  const fractionalPart = value - integerPart;
  const reducedFractionalPart = Math.floor(fractionalPart * factor) / factor;
  return integerPart + reducedFractionalPart;
};
const formatTimeStamp = (timestamp: string): string =>
  timestamp.slice(2, 10).replace(/-/g, ".");
