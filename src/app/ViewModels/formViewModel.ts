import { Data, useFormStore } from "../state/form";
export type SectionType = "animal" | "area" | "economy" | "climateSoil";

export const useFormViewModel = (section?: SectionType) => {
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
    sliderCoeValue,
    sliderDplValue,
    sliderForValue,
    sliderMsValue,
    sliderPrecoValue,
    resultSimulation,
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
