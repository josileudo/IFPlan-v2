import { colors, fontFamily } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
  },
  header: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: colors.textSecondary,
    fontFamily: fontFamily.bold,
    marginBottom: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stepIndicator: {
    width: 35,
    height: 35,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  activeStep: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  stepText: {
    color: colors.border,
    fontFamily: fontFamily.bold,
    fontSize: 16,
  },
  activeStepText: {
    color: colors.background,
  },
  line: {
    width: 20,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 10,
  },
  activeLine: {
    backgroundColor: colors.primary,
  },
  contentContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  backButton: {
    backgroundColor: colors.border,
    marginRight: 10,
  },
  backButtonText: {
    color: colors.textSecondary,
    fontFamily: fontFamily.bold,
  },
  nextButton: {
    backgroundColor: colors.primary,
  },
  nextButtonText: {
    color: colors.background,
    fontFamily: fontFamily.bold,
  },
});
