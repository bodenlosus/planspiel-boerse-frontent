import {
  getCurrentDate,
  getDateCertainDaysAgo,
  toISODateOnly,
} from "@/lib/date_utils";

export function getStockPagePath(id: number, days: number = 30): string {
  return `/dashboard/stock/${id}?start=${toISODateOnly(
    getDateCertainDaysAgo(days)
  )}&end=${toISODateOnly(getCurrentDate())}`;
}
