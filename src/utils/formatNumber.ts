import { Platform } from "react-native";

export const formatNumber = (number: number | string, decimals = 2): string => {
  const numericRegex = /^\d+(\.\d+)?$/;

  if (typeof number === "number") {
    return number.toFixed(decimals);
  }

  if (typeof number === "string" && numericRegex.test(number)) {
    return parseFloat(number).toFixed(decimals);
  }
};

export const verticalOffset = Platform.OS === "ios" ? 200 : 100;
