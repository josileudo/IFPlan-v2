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
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  text: {
    fontFamily: fontFamily.medium,
    fontSize: 14,
    color: colors.background,
  },
  disabled: {
    backgroundColor: colors.disabled,
  },
  secondary: {
    backgroundColor: colors.background,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  textSecondary: {
    color: colors.textSecondary,
  },
});
