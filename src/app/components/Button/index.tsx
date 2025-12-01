import { colors } from "@/theme";
import { styles } from "./styles";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string;
  isProcessing?: boolean;
  type?: "primary" | "secondary";
};

export const Button = ({
  title,
  isProcessing = false,
  type = "primary",
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
      <Text style={[styles.text, type === "secondary" && styles.textSecondary]}>
        {isProcessing ? (
          <ActivityIndicator size="small" color={colors.textPrimary} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
};
