import { useEffect } from "react";
import { Data, useFormStore } from "../state/form";
import { router } from "expo-router";
import { Alert } from "react-native";
export type SectionType = "animal" | "area" | "economy" | "climateSoil";

export const useFormViewModel = (section?: SectionType) => {
  const { navigate } = router;
  const {
    updateSection,
    currentStep,
    prevForm,
    nextForm,
    climateSoil,
    animal,
    area,
    economy,
    saveToStorage,
    loadFromStorage,
    loadSimulation,
    resetForm,
    history,
  } = useFormStore();

  const onSubmitForm = (data: Data) => {
    if (!section) return;
    updateSection(section, data);
    if (section !== "animal") {
      handleNext();
    } else {
      // saveToStorage();
      // navigate("/dashboard");
    }
  };

  const handleNext = () => {
    nextForm();
  };

  const handlePrev = () => {
    prevForm();
  };

  useEffect(() => {}, [climateSoil]);

  return {
    onSubmitForm,
    handleNext,
    handlePrev,
    currentStep,
    saveToStorage,
    loadFromStorage,
    climateSoil,
    animal,
    area,
    economy,
    loadSimulation,
    resetForm,
    updateSection,
  };
};
