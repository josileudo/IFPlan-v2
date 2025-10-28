import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 24,
  },
  infoContainer: {
    backgroundColor: colors.background,
  },
  logo: {
    width: "auto",
    height: 40,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontFamily: fontFamily.bold,
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: fontFamily.regular,
    textAlign: "center",
  },
  footer: {
    justifyContent: "flex-end",
    width: "100%",
  },
  privacyPolicy: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: fontFamily.regular,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
