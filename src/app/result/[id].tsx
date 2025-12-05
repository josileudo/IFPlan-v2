import { ScrollView, StyleSheet, Text, View, Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, fontFamily } from "@/theme";
import { MaskedText } from "react-native-mask-text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button } from "../components/Button";
import { Sliders, useFormStore } from "../state/form";
import { useEffect, useMemo, useRef, useState } from "react";
import { Header } from "../components/Hader";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { CustomModal } from "../components/CustomModal";
import { Input } from "../components/Input";

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
  const viewShotRef = useRef<ViewShot>(null);
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
    currentSimulation,
  } = useFormStore();
  const result = resultSimulation();
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [simulationName, setSimulationName] = useState(
    currentSimulation?.name || ""
  );
  const [simulationDescription, setSimulationDescription] = useState(
    currentSimulation?.description || ""
  );
  const [lastSlidersState, setLastSlidersState] = useState<Sliders>({
    sliderCoeValue,
    sliderDplValue,
    sliderForValue,
    sliderMsValue,
    sliderPrecoValue,
  });
  const [lastResult, setLastResult] = useState(resultSimulation());

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

  const colorAfterChanged = (item: keyof typeof result) => {
    return lastResult[item] !== result[item] ? "green" : "black";
  };

  const handleSave = () => {
    setModalVisible(true);
  };

  const handleConfirmSave = () => {
    if (!simulationName.trim()) {
      Alert.alert("Atenção", "Por favor, insira um nome para a simulação.");
      return;
    }

    if (params.id && params.id !== "unsaved") {
      updateSimulation(params.id, {
        name: simulationName,
        description: simulationDescription,
      });
    } else {
      saveSimulation(simulationName, simulationDescription);
    }

    setModalVisible(false);
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

  const handleShare = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      const newPath = FileSystem.documentDirectory + `result-${params.id}.png`;
      await FileSystem.copyAsync({ from: uri, to: newPath });
      await Sharing.shareAsync(newPath);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível gerar a imagem.");
    }
  };

  useEffect(() => {
    console.log(params);
    if (params.id) loadSimulation(params.id);
    setLastResult(resultSimulation());
  }, []);

  useEffect(() => {
    if (currentSimulation) {
      setSimulationName(currentSimulation.name || "");
      setSimulationDescription(currentSimulation.description || "");
    }
  }, [currentSimulation]);

  // TODO: Criar um Array de objetos para renderizar os resultados
  // TODO: Trocar o scrollview por uma FlatList

  return (
    <SafeAreaView style={styles.container}>
      <CustomModal visible={modalVisible}>
        <View style={{ width: "100%", gap: 20 }}>
          <Input
            value={simulationName}
            onChangeText={setSimulationName}
            label="Nome da simulação"
            placeholder="Digite o nome da simulação"
          />
          <Input
            value={simulationDescription}
            onChangeText={setSimulationDescription}
            label="Descrição"
            placeholder="Digite uma descrição (opcional)"
          />
          <Button title="Salvar" onPress={handleConfirmSave} />
          <Button
            title="Cancelar"
            onPress={() => setModalVisible(false)}
            type="secondary"
          />
        </View>
      </CustomModal>

      <Header
        title={"Resultados"}
        iconRight="share"
        onActionLeft={() => router.navigate("/dashboard")}
        onActionRight={() => handleShare()}
      />

      <View style={styles.wrapper}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <ViewShot
            ref={viewShotRef}
            captureMode="mount"
            options={{
              fileName: `result-${params.id}.png`,
              format: "jpg",
              quality: 1,
            }}
            style={{ flex: 1 }}
          >
            <Text
              style={styles.titleSimulation}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {currentSimulation?.name}
            </Text>
            <View style={styles.card}>
              <Text style={styles.title}>Solo-Água-Planta-Animal</Text>
              <View style={styles.item}>
                <Text style={styles.itemText}>
                  Tensão da água no solo (bar)
                </Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("tenAguaSolo"),
                  }}
                >
                  {result?.tenAguaSolo.toString()}
                </MaskedText>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemText}>
                  Produção de forragem (kg MV/m2)
                </Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("prodForragem"),
                  }}
                >
                  {result?.prodForragem.toString()}
                </MaskedText>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemText}>
                  Capacidade de suporte (animais)
                </Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("capaSuporte"),
                  }}
                >
                  {result?.capaSuporte.toString()}
                </MaskedText>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemText}>Taxa de lotação (vacas/ha)</Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("taxaLotacao"),
                  }}
                >
                  {result?.taxaLotacao.toString()}
                </MaskedText>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemText}>ITU</Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("itu"),
                  }}
                >
                  {result?.itu.toString()}
                </MaskedText>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemText}>DPL (L/vaca/dia)</Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("dpl"),
                  }}
                >
                  {result?.dpl.toString()}
                </MaskedText>
              </View>
              <View style={styles.item}>
                <Text style={styles.itemText}>
                  Pegada hídrica (L H2O/L leite)
                </Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("pegadaHidrica"),
                  }}
                >
                  {result?.pegadaHidrica.toString()}
                </MaskedText>
              </View>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>
                Sistemas-Custos-Resultado-Econômico
              </Text>

              <View style={styles.item}>
                <Text style={styles.itemText}>Produção diária (L/dia)</Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("prodDiaria"),
                  }}
                >
                  {result?.prodDiaria.toString()}
                </MaskedText>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>
                  Produção de leite (L/ha/dia)
                </Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("prodLeiteDia"),
                  }}
                >
                  {result?.prodLeiteDia.toString()}
                </MaskedText>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>
                  Produção de leite (L/ha/ano)
                </Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("prodLeiteAno"),
                  }}
                >
                  {result?.prodLeiteAno.toString()}
                </MaskedText>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>
                  Perda receita estresse (R$/ano)
                </Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("perdaReceitaEstresse"),
                  }}
                >
                  {result?.perdaReceitaEstresse.toString()}
                </MaskedText>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>COE (R$/L)</Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("coe"),
                  }}
                >
                  {result?.coe.toString()}
                </MaskedText>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>COT (R$/L)</Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("cot"),
                  }}
                >
                  {result?.cot.toString()}
                </MaskedText>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>ML (R$/L)</Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("mlArea"),
                  }}
                >
                  {result?.mlArea.toString()}
                </MaskedText>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>
                  Receita por área (R$/ha/ano)
                </Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("receitaTotalAno"),
                  }}
                >
                  {result?.receitaTotalAno.toString()}
                </MaskedText>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>TRCI (%a.a.)</Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("trci"),
                  }}
                >
                  {result?.trci.toString()}
                </MaskedText>
              </View>

              <View style={styles.item}>
                <Text style={styles.itemText}>Payback (anos)</Text>
                <MaskedText
                  mask="999999.99"
                  style={{
                    ...styles.resultText,
                    color: colorAfterChanged("payback"),
                  }}
                >
                  {result?.payback.toString()}
                </MaskedText>
              </View>
            </View>
          </ViewShot>
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
  titleSimulation: {
    fontSize: 18,
    fontFamily: fontFamily.medium,
    paddingVertical: 8,
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
    color: colors.textPrimary,
    fontFamily: fontFamily.bold,
  },
  resultText: {
    fontSize: 12,
    fontFamily: fontFamily.medium,
  },
  itemText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontFamily: fontFamily.regular,
  },
  footer: {
    paddingVertical: 12,
    gap: 8,
    backgroundColor: colors.background,
  },
  modal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
});
