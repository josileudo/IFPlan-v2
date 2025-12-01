import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  footer: {
    width: "100%",
    alignItems: "center",
  },
  buttonContainer: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  textInput: {
    width: "auto",
    flexGrow: 1,
    flexShrink: 1,
    height: 45,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d8d8d8",
    backgroundColor: "#fff",
    padding: 8,
    marginBottom: 8,
  },
});
