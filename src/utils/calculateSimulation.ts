import { ResultSimulation } from "@/app/state/form";
import { ClimateSoilSchema } from "@/app/components/Simulations/CimateSoil/schema";
import { AnimalSchema } from "@/app/components/Simulations/Animal/schema";
import { AreaSchema } from "@/app/components/Simulations/Area/schema";
import { EconomySchema } from "@/app/components/Simulations/Economy/schema";

type SimulationInput = ClimateSoilSchema &
  AnimalSchema &
  AreaSchema &
  EconomySchema;

export const calculateSimulation = (
  data: SimulationInput
): ResultSimulation => {
  // Extract input values from the combined data
  const {
    maxTemperature,
    minTemperature,
    windSpeed: velocidadeVento,
    precipitation: precipitacao,
    relativeHumidity: umidadeRelativa,
    dose: doseN,
    irrigationAvailableWater: aguaUsos,
    waterAndOtherUses: aguaDisponivelPorIrrigacao,
    pesoCorporal,
    milkProduction: producaoLeite,
    pbFatMilk: teorPB,
    milkFatContent: teorGordura,
    verticalShift: desloVertical,
    horizontalShift: desloHorizontal,
    lactatingCows: vacasLactacao,
    area,
    picketsNumber: numeroPiquetes,
    depreciationRate: taxaDepreciacao,
    investmentsPerLiters: investimento,
    familyIncome: rendaFamiliar,
  } = data;

  // Sliders (assuming 0 for now as they are not in the schema)
  const slidersState = {
    sliderCoeValue: 0,
    sliderDplValue: 0,
    sliderForValue: 0,
    sliderMsValue: 0,
    sliderPrecoValue: 0,
  };

  const varCoe = slidersState.sliderCoeValue / 100 + 1;
  // const varDpl = slidersState.sliderDplValue / 100 + 1; // Unused in Kotlin code provided
  const varFor = slidersState.sliderForValue / 100 + 1;
  const varMs = slidersState.sliderMsValue / 100 + 1;
  const varPreco = slidersState.sliderPrecoValue / 100 + 1;

  // ETo (mm)
  const ETo =
    ((24.211 * maxTemperature - 635.46) / 30.4 +
      (53.984 * velocidadeVento + 10.898) / 30.4) /
    2;

  // Irrigação (mm)
  const irrigacao = ETo - precipitacao;

  // Água aplicada (mm/dia)
  const aguaAplicada =
    precipitacao +
    (aguaDisponivelPorIrrigacao >= irrigacao
      ? irrigacao
      : aguaDisponivelPorIrrigacao);

  // Consumo (Kg MS/dia)
  const consumo =
    -4.69 + 0.0142 * pesoCorporal + 0.356 * producaoLeite + 1.72 * teorGordura;

  // Consumo de NDT
  const consumoNDT =
    (((48.6 -
      0.0183 * pesoCorporal +
      0.435 * producaoLeite +
      0.728 * teorGordura +
      3.46 * teorPB) *
      1.04) /
      100) *
    consumo;

  // NDT DV (Deslocamento Vertical)
  const NDTdv =
    desloVertical > 0
      ? 0.00669 * pesoCorporal * (desloVertical / 1000) * 0.43
      : 0.0;

  // NDT DH
  const NDTdh = 0.00048 * pesoCorporal * (desloHorizontal / 1000) * 0.43;

  // NDT deslocamento
  const NDTdeslocamento = NDTdh + NDTdv;

  // Consumo total (Kg MS/dia)
  const consTotal =
    (consumo + (NDTdeslocamento / consumoNDT) * consumo) * varMs;

  // Tensão da água no solo (bar)
  const tenAguaSolo = 0.0368068 + -1.06252 / aguaAplicada;

  // Depreciação (R$/L)
  const depreciacao = investimento * (taxaDepreciacao / 365);

  // ITU
  const ITU =
    (0.8 * (maxTemperature + minTemperature)) / 2 +
    (umidadeRelativa / 100) * ((maxTemperature + minTemperature) / 2 - 14.4) +
    46.4;

  // DPL
  const DPL = -1.075 - 1.736 * producaoLeite + 0.02474 * producaoLeite * ITU;

  // Produção de forragem
  const prodForragem =
    (1.36722 + -0.284546 * tenAguaSolo + -2.13514 * Math.pow(tenAguaSolo, 2)) *
    doseN *
    varFor;

  // Forragem Disponível
  const forrDisponivel = prodForragem * 10000 * (area / numeroPiquetes) * 0.2;

  // Suplementação (kg MS/dia)
  const suplementacao = producaoLeite / 2.5;

  // Capacidade de suporte (animais)
  const capaSuporte = (forrDisponivel * 0.95) / (consTotal - suplementacao);

  // DPL anual
  const DPLAnual = DPL * capaSuporte * 365;

  // Produção diária
  const prodDiaria = producaoLeite * (capaSuporte * (vacasLactacao / 100));

  // COE R$/L
  const COE =
    (4.52816 +
      -0.000142 * prodDiaria +
      0.00000000767199 * Math.pow(prodDiaria, 2) +
      -0.24042 * producaoLeite +
      0.004937 * Math.pow(producaoLeite, 2)) *
    varCoe;

  // Produção de leite (L/ha/ano)
  const prodLeiteAno = (prodDiaria * 365) / area;

  // Produção de leite (L/ha/dia)
  const prodLeiteDia = prodLeiteAno / 365;

  // MDO familiar
  const mdoFamiliar = rendaFamiliar / (prodDiaria * 30.4);

  // Pegada hídrica
  const pegadaHidrica =
    (aguaAplicada * 10000 * area + aguaUsos / 30.4) / prodDiaria;

  // Investimento total
  const investimentoTotal = investimento * prodDiaria;

  // COT
  const COT = COE + mdoFamiliar + depreciacao;

  // Participação da irrigação na água
  // const partIrrAgua = (irrigacao / aguaAplicada) * 100; // Unused in return

  // Preço do leite
  const precoLeite =
    (0.631922 * Math.pow(prodDiaria, 0.102383) +
      (-0.0132 * Math.pow(teorGordura, 2) + 0.1384 * teorGordura - 0.3089)) *
    varPreco;

  // Receita total (R$/mês)
  const receitaTotalMes = prodDiaria * precoLeite * 30.4;

  // ML (R$/L)
  const ML = precoLeite - COT;

  // ML Anual
  const MLAnual = ML * prodDiaria * 365;

  // Payback (Anos)
  const payback = investimentoTotal / MLAnual;

  // Perda de receita com estresse
  const perdaReceitaEstresse = DPLAnual * precoLeite;

  // Taxa de lotação
  const taxaLotacao = capaSuporte / area;

  // TRCI
  const TRCI = ((ML * 365) / investimento) * 100;

  // Receita por área
  // const recArea = (receitaTotalMes * 12) / area; // Unused in return

  // COE Total
  // const COETotal = COE * prodDiaria * 365; // Unused in return

  // Receita total (R$/ano)
  const receitaTotalAno = receitaTotalMes * 12;

  // ML por área
  const MLArea = MLAnual / area;

  return {
    ...data,
    tenAguaSolo: !isNaN(tenAguaSolo) ? tenAguaSolo : 0.0,
    prodForragem: !isNaN(prodForragem) ? prodForragem : 0.0,
    capaSuporte: !isNaN(capaSuporte) ? capaSuporte : 0.0,
    taxaLotacao: !isNaN(taxaLotacao) ? taxaLotacao : 0.0,
    itu: !isNaN(ITU) ? ITU : 0.0,
    dpl: !isNaN(DPL) ? DPL : 0.0,
    pegadaHidrica: !isNaN(pegadaHidrica) ? pegadaHidrica : 0.0,
    prodDiaria: !isNaN(prodDiaria) ? prodDiaria : 0.0,
    prodLeiteDia: !isNaN(prodLeiteDia) ? prodLeiteDia : 0.0,
    prodLeiteAno: !isNaN(prodLeiteAno) ? prodLeiteAno : 0.0,
    perdaReceitaEstresse: !isNaN(perdaReceitaEstresse)
      ? perdaReceitaEstresse
      : 0.0,
    coe: !isNaN(COE) ? COE : 0.0,
    cot: !isNaN(COT) ? COT : 0.0,
    receitaTotalAno: !isNaN(receitaTotalAno) ? receitaTotalAno : 0.0,
    mlArea: !isNaN(MLArea) ? MLArea : 0.0,
    trci: !isNaN(TRCI) ? TRCI : 0.0,
    payback: !isNaN(payback) ? payback : 0.0,
  } as ResultSimulation;
};
