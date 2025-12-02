import { ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme";
import { MaskedText } from "react-native-mask-text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "../components/Button";
import { Sliders, useFormStore } from "../state/form";
import { useEffect, useMemo, useState } from "react";
import { Header } from "../components/Hader";

export interface TensionWater {
  tenAguaSolo: number;
  prodForragem: number;
  capaSuporte: number;
  taxaLotacao: number;
  itu: number;
  dpl: number;
  pegadaHidrica: number;
}

export interface SystemsEconomic {
  prodDiaria: number;
  prodLeiteDia: number;
  prodLeiteAno: number;
  perdaReceitaEstresse: number;
  coe: number;
  cot: number;
  mlArea: number;
  receitaTotalAno: number;
  trci: number;
  payback: number;
}

export default function Result() {
  const params =
    useLocalSearchParams<{ id?: string; edited?: string }>() || null;
  const {
    resultSimulation,
    saveSimulation,
    updateSimulation,
    loadSimulation,
    history,
    sliderCoeValue,
    sliderDplValue,
    sliderForValue,
    sliderMsValue,
    sliderPrecoValue,
  } = useFormStore();
  const result = resultSimulation();
  const router = useRouter();
  const [lastSlidersState, setLastSlidersState] = useState<Sliders>({
    sliderCoeValue,
    sliderDplValue,
    sliderForValue,
    sliderMsValue,
    sliderPrecoValue,
  });

  const hasChangedAnySlider = useMemo(() => {
    return (
      lastSlidersState.sliderCoeValue !== sliderCoeValue ||
      lastSlidersState.sliderDplValue !== sliderDplValue ||
      lastSlidersState.sliderForValue !== sliderForValue ||
      lastSlidersState.sliderMsValue !== sliderMsValue ||
      lastSlidersState.sliderPrecoValue !== sliderPrecoValue
    );
  }, [
    sliderCoeValue,
    sliderDplValue,
    sliderForValue,
    sliderMsValue,
    sliderPrecoValue,
  ]);

  const handleSave = () => {
    if (params.id && params.id !== "unsaved") updateSimulation(params.id);
    else saveSimulation();

    router.replace("/dashboard");
    Alert.alert("Sucesso", "Simulação salva com sucesso!");
  };

  const handleEdit = () => {
    if (!params.id) return;
    if (params.id === "unsaved") {
      router.navigate(`/simulation/unsaved`);
    } else {
      router.navigate(`/simulation/${params.id}`);
    }
  };

  useEffect(() => {
    if (params.id) loadSimulation(params.id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Resultados"
        onNavigate={() => router.navigate("/dashboard")}
      />
      <View style={styles.wrapper}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <Text style={styles.title}>Solo-Água-Planta-Animal</Text>
            <View style={styles.item}>
              <Text>Tensão da água no solo (bar)</Text>
              <MaskedText mask="999999.99">
                {result?.tenAguaSolo.toString()}
              </MaskedText>
            </View>
            <View style={styles.item}>
              <Text>Produção de forragem (kg MV/m2)</Text>
              <MaskedText mask="999999.99">
                {result?.prodForragem.toString()}
              </MaskedText>
            </View>
            <View style={styles.item}>
              <Text>Capacidade de suporte (animais)</Text>
              <MaskedText mask="999999.99">
                {result?.capaSuporte.toString()}
              </MaskedText>
            </View>
            <View style={styles.item}>
              <Text>Taxa de lotação (vacas/ha)</Text>
              <MaskedText mask="999999.99">
                {result?.taxaLotacao.toString()}
              </MaskedText>
            </View>
            <View style={styles.item}>
              <Text>ITU</Text>
              <MaskedText mask="999999.99">{result?.itu.toString()}</MaskedText>
            </View>
            <View style={styles.item}>
              <Text>DPL (L/vaca/dia)</Text>
              <MaskedText mask="999999.99">{result?.dpl.toString()}</MaskedText>
            </View>
            <View style={styles.item}>
              <Text>Pegada hídrica (L H2O/L leite)</Text>
              <MaskedText mask="999999.99">
                {result?.pegadaHidrica.toString()}
              </MaskedText>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>
              Sistemas-Custos-Resultado-Econômico
            </Text>

            <View style={styles.item}>
              <Text>Produção diária (L/dia)</Text>
              <MaskedText mask="999999.99">
                {result?.prodDiaria.toString()}
              </MaskedText>
            </View>

            <View style={styles.item}>
              <Text>Produção de leite (L/ha/dia)</Text>
              <MaskedText mask="999999.99">
                {result?.prodLeiteDia.toString()}
              </MaskedText>
            </View>

            <View style={styles.item}>
              <Text>Produção de leite (L/ha/ano)</Text>
              <MaskedText mask="999999.99">
                {result?.prodLeiteAno.toString()}
              </MaskedText>
            </View>

            <View style={styles.item}>
              <Text>Perda receita estresse (R$/ano)</Text>
              <MaskedText mask="999999.99">
                {result?.perdaReceitaEstresse.toString()}
              </MaskedText>
            </View>

            <View style={styles.item}>
              <Text>COE (R$/L)</Text>
              <MaskedText mask="999999.99">{result?.coe.toString()}</MaskedText>
            </View>

            <View style={styles.item}>
              <Text>COT (R$/L)</Text>
              <MaskedText mask="999999.99">{result?.cot.toString()}</MaskedText>
            </View>

            <View style={styles.item}>
              <Text>ML (R$/L)</Text>
              <MaskedText mask="999999.99">
                {result?.mlArea.toString()}
              </MaskedText>
            </View>

            <View style={styles.item}>
              <Text>Receita por área (R$/ha/ano)</Text>
              <MaskedText mask="999999.99">
                {result?.receitaTotalAno.toString()}
              </MaskedText>
            </View>

            <View style={styles.item}>
              <Text>TRCI (%a.a.)</Text>
              <MaskedText mask="999999.99">
                {result?.trci.toString()}
              </MaskedText>
            </View>

            <View style={styles.item}>
              <Text>Payback (anos)</Text>
              <MaskedText mask="999999.99">
                {result?.payback.toString()}
              </MaskedText>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {(!params.id ||
            params.id === "unsaved" ||
            hasChangedAnySlider ||
            params.edited === "true") && (
            <Button title="Salvar" onPress={handleSave} />
          )}
          <Button
            title="Parâmetros da Simulação"
            icon="keyboard-arrow-up"
            type="secondary"
            onPress={() => router.navigate("/modalSimulation")}
          />
          <Button title="Editar" onPress={handleEdit} type="secondary" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 12,
  },
  content: {
    paddingVertical: 12,
  },
  card: {
    padding: 12,
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 12,
    gap: 4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.textPrimary,
  },
  footer: {
    paddingVertical: 12,
    gap: 8,
    backgroundColor: colors.background,
  },
});
