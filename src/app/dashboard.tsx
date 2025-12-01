import { Card } from "@/app/components/Card";
import { List } from "@/app/components/List";
import { router } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useFormStore } from "./state/form";

export default function Dashboard() {
  const { navigate } = router;
  const { loadFromStorage, history } = useFormStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 12 }}>
        <List
          data={history}
          renderItem={({ item }) => (
            <Card
              data={{
                id: item.id,
                title: item.name,
                description: "Simulação fazenda teste 123",
                createdAt: item.date,
                updatedAt: item.date,
                isFavorite: false,
              }}
              onPress={() => navigate(`/result/${item.id}`)}
            />
          )}
          showButton
          buttonPress={() => navigate(`/simulation/new`)}
          title={"Listagem de simulação"}
        />
      </View>
    </SafeAreaView>
  );
}
