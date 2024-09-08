import {
  getCurrentDate,
  getDateCertainDaysAgo,
  toISODateOnly,
} from "@/lib/date_utils";

export function getStockPagePath(id: number): string {
  return `/dashboard/stock/${id}?start=${toISODateOnly(
    getDateCertainDaysAgo(30)
  )}&end=${toISODateOnly(getCurrentDate())}`;
}
