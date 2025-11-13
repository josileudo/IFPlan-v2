import { ClimateSoil } from "@/app/components/Simulations/CimateSoil";
import { StepIndicator } from "@/app/components/StepIndicator";
import { SafeAreaView, Text } from "react-native";

export default function Simulation() {
  const steps = [
    {
      title: "Clima e solo",
      children: <ClimateSoil />,
    },
    {
      title: "Área",
      children: <Text>Dados de localização view</Text>,
    },
    {
      title: "Economia",
      children: <Text>Dados de localização view</Text>,
    },
    {
      title: "Animal",
      children: <Text>Dados de localização view</Text>,
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StepIndicator
        title={"Criação de uma nova simulação"}
        steps={steps}
        showButtons
      />
    </SafeAreaView>
  );
}
