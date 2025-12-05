import { ClimateSoil } from "@/app/components/Simulations/CimateSoil";
import { StepIndicator } from "@/app/components/StepIndicator";
import { Alert, SafeAreaView, View } from "react-native";
import { Economy } from "../components/Simulations/Economy";
import { Animal } from "../components/Simulations/Animal";
import { useFormViewModel } from "../ViewModels/formViewModel";
import { Area } from "../components/Simulations/Area";
import { useCallback, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { Header } from "../components/Hader";

export default function Simulation() {
  const params = useLocalSearchParams<{ id?: string }>();
  const { currentStep, loadSimulation, resetForm } = useFormViewModel();

  const steps = [
    {
      title: "Clima e solo",
      children: <ClimateSoil />,
    },
    {
      title: "Área",
      children: <Area />,
    },
    {
      title: "Economia",
      children: <Economy />,
    },
    {
      title: "Animal",
      children: <Animal />,
    },
  ];

  const initialConfig = useCallback(() => {
    if (params.id === "new") {
      resetForm();
    } else if (params.id && params.id !== "unsaved") {
      loadSimulation(params.id);
    }
  }, [params.id]);

  useEffect(() => {
    initialConfig();
  }, [initialConfig]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title="Nova Simulação" />
      <StepIndicator
        steps={steps}
        showButtons={false}
        currentStep={currentStep}
      />
    </SafeAreaView>
  );
}
