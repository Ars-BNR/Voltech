export const convertStringToNumber = (value) => {
  if (typeof value === "string") {
    value = Number(value.replace(/[^0-9]/g, ""));
  }
  return value;
};
