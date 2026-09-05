export const formatCurrency = (amount: number | null | undefined): string => {
  const numericValue = typeof amount === "number" && !isNaN(amount) ? amount : 0;
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(numericValue);
  } catch {
    return `₹${numericValue}`;
  }
};

export const formatDate = (dateInput: string | Date | null | undefined, fallback: string = "N/A"): string => {
  if (!dateInput) return fallback;
  try {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return fallback;
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return fallback;
  }
};

export const exportToCSV = (filename: string, headers: string[], rows: (string | number)[][]): void => {
  try {
    if (!rows || rows.length === 0) return;
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) { }
};
