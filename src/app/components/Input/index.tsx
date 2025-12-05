import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";
import { colors } from "@/theme";
import { forwardRef } from "react";
import { MaskedTextInput } from "react-native-mask-text";

type Props = TextInputProps & {
  label?: string;
  mask?: string;
  errorMessage?: string;
};

export const Input = forwardRef(
  ({ label, errorMessage, mask, onChangeText, ...rest }: Props, ref) => {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        {mask ? (
          <MaskedTextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor={colors.border}
            mask={mask}
            onChangeText={(text, rawText) => {
              onChangeText?.(rawText);
            }}
            {...rest}
          />
        ) : (
          <TextInput
            ref={ref}
            style={styles.input}
            placeholderTextColor={colors.border}
            onChangeText={onChangeText}
            {...rest}
          />
        )}

        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    );
  }
);
