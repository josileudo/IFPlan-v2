import { z } from "zod";

const alertMessage = "Inserir um valor maior que 0";
const fieldObligation = "Campo obrigatóro";

export const formFieldsEconomy = [
  {
    name: "investmentsPerLiters",
    label: "Investimentos por L (R$/L)",
    placeholder: "Digite o valor de investimentos por litro",
    decimalsNumber: 2,
  },
  {
    name: "familyIncome",
    label: "Renda familiar (R$/mês)",
    placeholder: "Digite a renda familiar mensal",
    decimalsNumber: 2,
  },
  {
    name: "depreciationRate",
    label: "Taxa de depreciação (%a.a.)",
    placeholder: "Digite a taxa de depreciação anual",
  },
];

export const economySchema = z.object({
  investmentsPerLiters: z
    .number({ message: fieldObligation })
    .min(0, alertMessage),
  familyIncome: z.number({ message: fieldObligation }).min(0, alertMessage),
  depreciationRate: z.number({ message: fieldObligation }).min(0, alertMessage),
});

export type EconomySchema = z.infer<typeof economySchema>;
