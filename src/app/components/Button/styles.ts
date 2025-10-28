import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 48,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.background,
  },
});
