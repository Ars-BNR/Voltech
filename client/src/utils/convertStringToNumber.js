export const convertStringToNumber = (value) => {
  // console.log("тип конвертированного значения", typeof value);
  if (typeof value === "string") {
    value = Number(value.replace(/[^0-9]/g, ""));
  }
  return value;
};
