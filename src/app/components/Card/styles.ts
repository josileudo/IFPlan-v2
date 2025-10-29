import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: colors.card,
    height: 120,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "space-between",
  },
  title: {
    color: colors.textPrimary,
    fontSize: 14,
    fontFamily: fontFamily.bold,
    marginBottom: 4,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: fontFamily.regular,
  },
  date: {
    color: colors.textSecondary,
    fontSize: 12,
    fontFamily: fontFamily.regular,
  },
});
