// utils/formatDate.ts
export const formatDate = (dateStr: string) => {
    if (!dateStr) return "";

    const date = new Date(dateStr);

    // locale ашиглахгүй, тогтмол format ашиглах
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`; // 2025-01-04
};
