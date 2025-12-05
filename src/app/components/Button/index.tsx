import { colors } from "@/theme";
import { styles } from "./styles";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  title: string;
  isProcessing?: boolean;
  icon?: keyof typeof MaterialIcons.glyphMap & string;
  type?: "primary" | "secondary";
};

export const Button = ({
  title,
  isProcessing = false,
  type = "primary",
  icon,
  ...rest
}: Props) => {
  const isDisabled = () => isProcessing || rest.disabled;

  return (
    <TouchableOpacity
      {...rest}
      style={[
        styles.container,
        isDisabled() && styles.disabled,
        rest.style,
        type === "secondary" && styles.secondary,
      ]}
      activeOpacity={0.8}
      disabled={isDisabled()}
    >
      <View style={styles.content}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={24}
            color={type === "secondary" ? colors.primary : colors.background}
          />
        )}
        <Text
          style={[styles.text, type === "secondary" && styles.textSecondary]}
        >
          {isProcessing ? (
            <ActivityIndicator size="small" color={colors.background} />
          ) : (
            title
          )}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
