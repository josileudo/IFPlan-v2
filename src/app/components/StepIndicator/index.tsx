import { styles } from "./styles";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Step = {
  title: string;
  children: React.ReactNode;
};

type Props = {
  title: string;
  steps: Step[];
};

export const StepIndicator = ({ title, steps }: Props) => {
  const [step, setStep] = useState(1);
  const totalSteps = steps?.length ?? 0;

  const handleNext = () => {
    setStep((prevStep) => Math.min(prevStep + 1, totalSteps));
  };

  const handlePrevious = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const renderStepIndicator = () => {
    const indicators = [];
    for (let i = 1; i <= totalSteps; i++) {
      indicators.push(
        <View key={i} style={styles.stepContainer}>
          <View style={[styles.stepIndicator, i <= step && styles.activeStep]}>
            <Text style={[styles.stepText, i <= step && styles.activeStepText]}>
              {i}
            </Text>
          </View>
          {i < totalSteps && (
            <View style={[styles.line, i < step && styles.activeLine]} />
          )}
        </View>,
      );
    }
    return <View style={styles.indicatorContainer}>{indicators}</View>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {renderStepIndicator()}
      </View>

      <View style={styles.contentContainer}>{steps[step - 1].children}</View>

      <View style={styles.buttonContainer}>
        {step > 1 && (
          <TouchableOpacity
            onPress={handlePrevious}
            style={[styles.button, styles.backButton]}
          >
            <Text style={styles.backButtonText}>Anterior</Text>
          </TouchableOpacity>
        )}
        {step < totalSteps ? (
          <TouchableOpacity
            onPress={handleNext}
            style={[styles.button, styles.nextButton]}
          >
            <Text style={styles.nextButtonText}>Próximo</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => alert("Salvar")}
            style={[styles.button, styles.nextButton]}
          >
            <Text style={styles.nextButtonText}>Salvar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
