import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    gap: 16,
    paddingTop: 16,
    paddingBottom: 72,
  },
  title: {
    marginTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    fontSize: 18,
    fontFamily: fontFamily.medium,
    color: colors.primary,
  },
  empty: {
    fontSize: 14,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },
});
