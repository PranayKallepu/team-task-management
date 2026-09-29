import dayjs from "dayjs";

export { cn } from "cn";

export function formatProjectName(slug) {
  if (!slug) return "";
  return decodeURIComponent(slug)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatUserDate(created) {
  dayjs(created);
  return dayjs().format("DD-MM-YYYY");
}
