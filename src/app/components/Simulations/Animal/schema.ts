import { z } from "zod";

const alertMessage = "Inserir um valor maior que 0";
const fieldObligation = "Campo obrigatóro";

export const formFieldsAnimal = [
  {
    name: "pesoCorporal",
    label: "Peso corporal (kg)",
    placeholder: "Digite o peso corporal",
    decimalsNumber: 2,
  },
  {
    name: "milkProduction",
    label: "Produção de leite (L/vaca/dia)",
    placeholder: "Digite a produção de leite diária",
    decimalsNumber: 1,
  },
  {
    name: "milkFatContent",
    label: "Teor de gordura no leite (%)",
    placeholder: "Digite o teor de gordura",
    decimalsNumber: 1,
  },
  {
    name: "pbFatMilk",
    label: "Teor de PB no leite (%)",
    placeholder: "Digite o teor de proteína bruta",
    decimalsNumber: 1,
  },
  {
    name: "horizontalShift",
    label: "Deslocamento horizontal (m)",
    placeholder: "Digite o deslocamento horizontal",
  },
  {
    name: "verticalShift",
    label: "Deslocamento vertical (m)",
    placeholder: "Digite o deslocamento vertical",
  },
  {
    name: "lactatingCows",
    label: "Vacas em lactação (%)",
    placeholder: "Digite o percentual de vacas em lactação",
    decimalsNumber: 1,
  },
];

export const animalSchema = z.object({
  pesoCorporal: z.number({ message: fieldObligation }).min(0, alertMessage),
  milkProduction: z.number({ message: fieldObligation }).min(0, alertMessage),
  milkFatContent: z.number({ message: fieldObligation }).min(0, alertMessage),
  pbFatMilk: z.number({ message: fieldObligation }).min(0, alertMessage),
  horizontalShift: z.number({ message: fieldObligation }).min(0, alertMessage),
  verticalShift: z.number({ message: fieldObligation }).min(0, alertMessage),
  lactatingCows: z.number({ message: fieldObligation }).min(0, alertMessage),
});

export type AnimalSchema = z.infer<typeof animalSchema>;
