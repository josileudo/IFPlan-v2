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
};

export const Button = ({ title, isProcessing = false, ...rest }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      disabled={isProcessing}
      {...rest}
    >
      <Text style={styles.text}>
        {isProcessing ? (
          <ActivityIndicator size="small" color={colors.white} />
        ) : (
          title
        )}
      </Text>
    </TouchableOpacity>
  );
};
