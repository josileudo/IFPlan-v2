import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";

type Props = TextInputProps & {
  label: string;
};

export const Input = ({ label, ...rest }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.textPrimary}
        {...rest}
      />
    </View>
  );
};
