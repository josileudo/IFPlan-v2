import { StyleSheet, Text, View } from "react-native";
import { Slider } from "./components/Slider";
import { Sliders, useFormStore } from "./state/form";
import { Button } from "./components/Button";
import { useRouter } from "expo-router";
import { ButtonIcon } from "./components/ButtonIcon";
import { useState } from "react";

export default function ModalSimulation() {
  const router = useRouter();

  const {
    setSliderCoeValue,
    setSliderDplValue,
    setSliderForValue,
    setSliderMsValue,
    setSliderPrecoValue,
    sliderCoeValue,
    sliderDplValue,
    sliderForValue,
    sliderMsValue,
    sliderPrecoValue,
    resetSliders,
  } = useFormStore();
  const [lastState, setLastState] = useState<Sliders>({
    sliderCoeValue,
    sliderDplValue,
    sliderForValue,
    sliderMsValue,
    sliderPrecoValue,
  });

  const handleCancel = () => {
    resetSliders();
    setSliderCoeValue(lastState.sliderCoeValue);
    setSliderDplValue(lastState.sliderDplValue);
    setSliderForValue(lastState.sliderForValue);
    setSliderMsValue(lastState.sliderMsValue);
    setSliderPrecoValue(lastState.sliderPrecoValue);
    router.dismiss();
  };

  const handleSave = () => {
    setLastState({
      sliderCoeValue,
      sliderDplValue,
      sliderForValue,
      sliderMsValue,
      sliderPrecoValue,
    });
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ButtonIcon
          type="secondary"
          icon="keyboard-arrow-down"
          size={24}
          onPress={() => router.dismiss()}
        />
        <Text style={styles.title}>Parâmetros da Simulação</Text>
        <View />
      </View>
      <View style={styles.content}>
        <Slider
          label="COE"
          value={sliderCoeValue}
          onValueChange={(value) => setSliderCoeValue(value)}
        />
        <Slider
          label="DPL"
          value={sliderDplValue}
          onValueChange={(value) => setSliderDplValue(value)}
        />
        <Slider
          label="FOR"
          value={sliderForValue}
          onValueChange={(value) => setSliderForValue(value)}
        />
        <Slider
          label="MS"
          value={sliderMsValue}
          onValueChange={(value) => setSliderMsValue(value)}
        />
        <Slider
          label="Preço"
          value={sliderPrecoValue}
          onValueChange={(value) => setSliderPrecoValue(value)}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonContainer}>
          <Button
            title="Salvar"
            type="primary"
            style={styles.button}
            onPress={handleSave}
          />
          <Button
            title="Cancelar"
            type="secondary"
            style={styles.button}
            onPress={handleCancel}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    gap: 12,
  },
  header: {
    width: "100%",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingHorizontal: 12,
  },
  footer: {
    width: "100%",
    padding: 12,
    justifyContent: "flex-end",
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 8,
  },
  button: {
    width: "100%",
  },
});
