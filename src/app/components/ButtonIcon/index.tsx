import { colors } from "@/theme";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

type Props = {
  icon?: keyof typeof MaterialIcons.glyphMap & string;
  type?: "primary" | "secondary";
  onPress: () => void;
};

export const ButtonIcon = ({
  icon = "add",
  type = "primary",
  onPress,
}: Props) => {
  const iconColor = type === "primary" ? colors.background : colors.primary;
  const backgroundColor =
    type === "primary" ? colors.primary : colors.background;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <MaterialIcons name={icon} size={24} color={iconColor} />
    </TouchableOpacity>
  );
};
