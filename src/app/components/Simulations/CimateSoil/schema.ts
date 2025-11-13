import { z } from "zod";

const alertMessage = "Inserir um valor maior que 0";
const fieldObligation = "Campo obrigatóro";

export const formFields = [
  {
    name: "precipitation",
    label: "Precipitação (mm/dia)",
    placeholder: "Digite o valor de precipitação",
  },
  {
    name: "maxTemperature",
    label: "Temperatura máxima (°C)",
    placeholder: "Digite a temperatura máxima",
  },
  {
    name: "minTemperature",
    label: "Temperatura mínima (°C)",
    placeholder: "Digite a temperatura mínima",
  },
  {
    name: "relativeHumidity",
    label: "Umidade relativa (%)",
    placeholder: "Digite o valor da umidade relativa",
  },
  {
    name: "windSpeed",
    label: "Velocidade do Vento (m/s)",
    placeholder: "Digite a velocidade do vento",
  },
  {
    name: "dose",
    label: "Dose de N (dose)",
    placeholder: "Digite a dose de nitrogênio",
  },
  {
    name: "irrigationAvailableWater",
    label: "Água e outros usos (L/mês)",
    placeholder: "Digite o valor da água disponível",
  },
  {
    name: "waterAndOtherUses",
    label: "Água disponível para irrigação (m3/dia)",
    placeholder: "Digite o valor de água e outros usos",
  },
];

export const climateSoilSchema = z.object({
  precipitation: z.number({ message: fieldObligation }).min(0, alertMessage),
  maxTemperature: z.number({ message: fieldObligation }).min(0, alertMessage),
  minTemperature: z.number({ message: fieldObligation }).min(0, alertMessage),
  relativeHumidity: z
    .number({ message: fieldObligation })
    .min(0)
    .max(100, alertMessage),
  windSpeed: z.number({ message: fieldObligation }).min(0, alertMessage),
  dose: z.number({ message: fieldObligation }).min(0, alertMessage),
  irrigationAvailableWater: z
    .number({ message: fieldObligation })
    .min(0, alertMessage),
  waterAndOtherUses: z
    .number({ message: fieldObligation })
    .min(0, alertMessage),
});

export type ClimateSoilSchema = z.infer<typeof climateSoilSchema>;
