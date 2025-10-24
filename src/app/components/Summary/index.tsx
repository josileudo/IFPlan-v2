import { ColorValue, Text, View } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";

export type SummaryProps = {
  label: string;
  value: string;
};

type Props = {
  data: SummaryProps;
  icon: {
    name: keyof typeof MaterialIcons.glyphMap;
    color: ColorValue;
  };
  isLeft?: boolean;
};

export const Summary = ({ data, icon, isLeft = false }: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.header, isLeft && { justifyContent: "flex-end" }]}>
        <MaterialIcons size={16} name={icon.name} color={icon.color} />
        <Text style={styles.label}>{data.label}</Text>
      </View>

      <Text style={styles.value}>{data.value}</Text>
    </View>
  );
};
