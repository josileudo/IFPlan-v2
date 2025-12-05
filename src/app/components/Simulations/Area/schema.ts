import { z } from "zod";

const alertMessage = "Inserir um valor maior que 0";
const fieldObligation = "Campo obrigatóro";

export const formFieldsArea = [
  {
    name: "area",
    label: "Área (ha)",
    placeholder: "Digite a área total em hectares",
  },
  {
    name: "picketsNumber",
    label: "Número de piquetes (Unid)",
    placeholder: "Digite o número de piquetes",
  },
];

export const areaSchema = z.object({
  area: z.number({ message: fieldObligation }).min(0, alertMessage),
  picketsNumber: z.number({ message: fieldObligation }).min(0, alertMessage),
});

export type AreaSchema = z.infer<typeof areaSchema>;
