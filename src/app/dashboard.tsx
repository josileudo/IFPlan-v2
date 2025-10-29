import { Card, SimulationDataProps } from "@/app/components/Card";
import { List } from "@/app/components/List";
import { SafeAreaView, Text, View } from "react-native";

const data = [
  {
    id: "1",
    title: "Simulação de Investimento A",
    description: "Simulação fornecida por IFPlan",
    createdAt: "2025-10-20T10:30:00.000Z",
    updatedAt: "2025-10-25T14:45:00.000Z",
    isFavorite: true,
  },
  {
    id: "2",
    title: "Simulação de Crédito B",
    description: "Simulação fazenda teste 123",
    createdAt: "2025-09-15T09:00:00.000Z",
    updatedAt: "2025-10-18T16:20:00.000Z",
    isFavorite: false,
  },
] as SimulationDataProps[];

export default function Dashboard() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 12 }}>
        <List
          data={data}
          renderItem={({ item }) => <Card data={item} />}
          showButton
          title={"Listagem de simulação"}
        />
      </View>
    </SafeAreaView>
  );
}
