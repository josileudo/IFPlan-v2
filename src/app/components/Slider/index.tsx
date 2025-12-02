import { colors, fontFamily } from "@/theme";
import SliderComponent, { SliderProps } from "@react-native-community/slider";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = SliderProps & {
  label: string;
  value: number;
  onValueChange?: (value: number) => void;
};

export const Slider = ({ label, value, onValueChange, ...rest }: Props) => {
  const [internalValue, setInternalValue] = useState(value);

  const handleChangeValue = (value: number) => {
    console.log(value);
    setInternalValue(value);
    onValueChange?.(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.labelValue}>{internalValue}%</Text>
      </View>
      <SliderComponent
        style={{ width: "100%" }}
        maximumValue={100}
        minimumValue={1}
        step={1}
        tapToSeek
        minimumTrackTintColor={colors.secondary}
        maximumTrackTintColor={colors.card}
        thumbTintColor={colors.primary}
        value={value}
        onValueChange={handleChangeValue}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontFamily: fontFamily.regular,
    color: colors.textSecondary,
  },
  labelValue: {
    fontSize: 16,
    fontFamily: fontFamily.bold,
    color: colors.textSecondary,
  },
});
