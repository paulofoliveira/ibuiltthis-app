import { z } from "zod";

export const productSchema = z.object({
    name: z
        .string()
        .min(3, { message: "O nome deve ter pelo menos 3 caracteres" })
        .max(120, { message: "O nome deve ter no máximo 120 caracteres" }),
    slug: z
        .string()
        .min(3, { message: "O endereço do produto deve ter pelo menos 3 caracteres" })
        .max(140, { message: "O endereço do produto deve ter no máximo 140 caracteres" })
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
            message: "O endereço do produto deve conter apenas letras minúsculas sem acentos, números e hífens",
        }),
    tagline: z
        .string()
        .max(200, { message: "A descrição curta deve ter no máximo 200 caracteres" }),
    description: z.string().optional(),
    websiteUrl: z.string().min(1, { message: "A URL do site é obrigatória" }),
    tags: z
        .string()
        .min(1, { message: "Informe as categorias" })
        .transform((val) => val.split(",").map((tag) => tag.trim().toLowerCase())),
});