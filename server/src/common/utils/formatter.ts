export const safeNumber = function (val: any, fallback: number = 0): number {
  if (val === null || val === undefined || isNaN(Number(val))) return fallback;
  return Number(val);
};

export const safeString = function (val: any, fallback: string = "N/A"): string {
  if (!val || typeof val !== "string" || val.trim() === "") return fallback;
  return val.trim();
};

export const safeDate = function (val: any): Date | null {
  if (!val) return null;
  const d = new Date(val);
  return isNaN(d.getTime()) ? null : d;
};