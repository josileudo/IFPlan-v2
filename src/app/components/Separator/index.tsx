import { ColorValue, View } from "react-native";
import { styles } from "./styles";

export const Separator = ({ color }: { color: ColorValue }) => {
  return <View style={[styles.container, { backgroundColor: color }]} />;
};
