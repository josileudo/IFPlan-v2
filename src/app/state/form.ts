import { create } from "zustand";
import { ClimateSoilSchema } from "../components/Simulations/CimateSoil/schema";
import { AnimalSchema } from "../components/Simulations/Animal/schema";
import { EconomySchema } from "../components/Simulations/Economy/schema";
import { AreaSchema } from "../components/Simulations/Area/schema";
import { SectionType } from "../ViewModels/formViewModel";
import { MMKVLoader } from "react-native-mmkv-storage";
import { calculateSimulation } from "@/utils/calculateSimulation";
import { SystemsEconomic, TensionWater } from "../result/[id]";

// concatenar os tipos de dados
export type Data =
  | ClimateSoilSchema
  | AnimalSchema
  | AreaSchema
  | EconomySchema
  | Sliders;

export type Sliders = {
  sliderCoeValue: number;
  sliderDplValue: number;
  sliderForValue: number;
  sliderMsValue: number;
  sliderPrecoValue: number;
};

export type ResultSimulation = EconomySchema &
  SystemsEconomic &
  TensionWater &
  Sliders;

export interface SavedSimulation {
  id: string;
  date: string;
  name: string;
  data: ResultSimulation;
}

interface FormState {
  data: Data | null;
  currentSimulation: SavedSimulation | null;
  nextForm: () => void;
  prevForm: () => void;
  updateSection: (section: SectionType, data: Data) => void;
  climateSoil: ClimateSoilSchema;
  animal: AnimalSchema;
  area: AreaSchema;
  economy: EconomySchema;
  currentStep: number;
  resultSimulation: () => ResultSimulation;
  saveToStorage: () => void;
  loadFromStorage: () => void;
  resetForm: () => void;
  // Sliders
  sliderCoeValue: number;
  setSliderCoeValue: (value: number) => void;
  sliderDplValue: number;
  setSliderDplValue: (value: number) => void;
  sliderForValue: number;
  setSliderForValue: (value: number) => void;
  sliderMsValue: number;
  setSliderMsValue: (value: number) => void;
  sliderPrecoValue: number;
  setSliderPrecoValue: (value: number) => void;
  resetSliders: () => void;
  // History
  history: SavedSimulation[];
  saveSimulation: (name?: string) => void;
  updateSimulation: (id: string) => void;
  loadSimulation: (id: string) => void;
  deleteSimulation: (id: string) => void;
}

const initialState = {
  data: null,
  currentSimulation: null,
  climateSoil: {} as ClimateSoilSchema,
  animal: {} as AnimalSchema,
  area: {} as AreaSchema,
  economy: {} as EconomySchema,
  currentStep: 1,
  history: [],
  sliderCoeValue: 1,
  sliderDplValue: 1,
  sliderForValue: 1,
  sliderMsValue: 1,
  sliderPrecoValue: 1,
};

const storage = new MMKVLoader().initialize();

export const useFormStore = create<FormState>((set, get) => ({
  ...initialState,
  updateSection: (section: SectionType, data: Data) => {
    set({ [section]: { ...get()[section], ...data } });
  },
  nextForm: () => {
    set({ currentStep: get().currentStep + 1 });
  },
  prevForm: () => {
    set({ currentStep: get().currentStep - 1 });
  },
  saveToStorage: () => {
    const state = get();
    const dataToSave = {
      climateSoil: state.climateSoil,
      animal: state.animal,
      area: state.area,
      economy: state.economy,
    };
    storage.setString("formData", JSON.stringify(dataToSave));
    console.log("Data saved to MMKV");
  },
  loadFromStorage: () => {
    const dataString = storage.getString("formData");
    const historyString = storage.getString("simulationHistory");

    let updates: Partial<FormState> = {};

    if (dataString) {
      const data = JSON.parse(dataString);
      updates = {
        ...updates,
        climateSoil: data.climateSoil,
        animal: data.animal,
        area: data.area,
        economy: data.economy,
      };
      console.log("Data loaded from MMKV");
    }

    if (historyString) {
      const history = JSON.parse(historyString);
      updates = { ...updates, history };
      console.log("History loaded from MMKV");
    }

    if (Object.keys(updates).length > 0) {
      set(updates);
    }
  },
  resultSimulation: () => {
    const sliders = {
      sliderCoeValue: get().sliderCoeValue,
      sliderDplValue: get().sliderDplValue,
      sliderForValue: get().sliderForValue,
      sliderMsValue: get().sliderMsValue,
      sliderPrecoValue: get().sliderPrecoValue,
    };

    return calculateSimulation({
      ...get().climateSoil,
      ...get().animal,
      ...get().area,
      ...get().economy,
      ...sliders,
    });
  },
  // History Actions
  saveSimulation: (name) => {
    const state = get();
    const result = state.resultSimulation();
    const newSimulation: SavedSimulation = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      name: name || `Simulação ${new Date().toLocaleDateString()}`,
      data: result,
    };

    const newHistory = [newSimulation, ...state.history];
    set({ history: newHistory });
    storage.setString("simulationHistory", JSON.stringify(newHistory));
    console.log("Simulation saved to history");
  },
  updateSimulation: (id) => {
    const state = get();
    const result = state.resultSimulation();
    const newHistory = state.history.map((sim) => {
      if (sim.id === id) {
        return {
          ...sim,
          date: new Date().toISOString(),
          data: result,
        };
      }
      return sim;
    });
    set({ history: newHistory });
    storage.setString("simulationHistory", JSON.stringify(newHistory));
    console.log("Simulation updated");
  },
  loadSimulation: (id) => {
    const history = get().history;
    const simulation = history.find((sim) => sim.id === id);

    if (simulation) {
      const data = simulation.data;

      set({
        climateSoil: { ...data } as unknown as ClimateSoilSchema,
        animal: { ...data } as unknown as AnimalSchema,
        area: { ...data } as unknown as AreaSchema,
        economy: { ...data } as unknown as EconomySchema,
        currentStep: 1,
        currentSimulation: simulation,
      });
    }
  },
  deleteSimulation: (id) => {
    const state = get();
    const newHistory = state.history.filter((sim) => sim.id !== id);
    set({ history: newHistory });
    storage.setString("simulationHistory", JSON.stringify(newHistory));
  },
  resetForm: () => {
    get().resetSliders();
    set({
      animal: {} as AnimalSchema,
      area: {} as AreaSchema,
      climateSoil: {} as ClimateSoilSchema,
      economy: {} as EconomySchema,
      currentStep: 1,
    });
  },
  resetSliders: () => {
    set({
      sliderCoeValue: 1,
      sliderDplValue: 1,
      sliderForValue: 1,
      sliderMsValue: 1,
      sliderPrecoValue: 1,
    });
  },
  setSliderCoeValue: (value) => {
    set({ sliderCoeValue: value });
  },
  setSliderDplValue: (value) => {
    set({ sliderDplValue: value });
  },
  setSliderForValue: (value) => {
    set({ sliderForValue: value });
  },
  setSliderMsValue: (value) => {
    set({ sliderMsValue: value });
  },
  setSliderPrecoValue: (value) => {
    set({ sliderPrecoValue: value });
  },
}));
