import { StatusBar, Text, View } from "react-native";
import { router } from "expo-router";

// MARK: Entrada de dados
const summary = {
  input: { label: "Entradas", value: "R$ 1.000,00" },
  output: { label: "Saídas", value: "-R$ 500,00" },
  total: "R$ 500,00",
};

const targets = [
  {
    id: "1",
    name: "Comprar uma cadeira ergonômica",
    percentage: "75%",
    current: "R$ 900,00",
    target: "R$ 1.200,00",
  },
  {
    id: "2",
    name: "Comprar um novo notebook",
    percentage: "40%",
    current: "R$ 2.000,00",
    target: "R$ 5.000,00",
  },
];

export default function Index() {
  const { navigate } = router;
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar barStyle="light-content" />
      <Text>Bem-vindos ao app</Text>
    </View>
  );
}
