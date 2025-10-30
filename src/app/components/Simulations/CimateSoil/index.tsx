import { Input } from "@/app/components/Input";
import { Text, View } from "react-native";

export const ClimateSoil = () => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Text>Clima e solo</Text>
      <Input label="Clima" placeholder="Testando input" />
    </View>
  );
};
