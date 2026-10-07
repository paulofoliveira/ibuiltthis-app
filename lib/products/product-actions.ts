"use server"

import { db } from "@/db";
import { products } from "@/db/schema";
import { FormState } from "@base-ui/react/form";
import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validations";
import z from "zod";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upvoteProductAction = async (productId: number) => {

    try {

        const { userId, orgId } = await auth();

        if (!userId) {
            console.log("User not signed in");
            return {
                success: false,
                message: "Você precisa entrar na sua conta para enviar um produto",
            };
        }

        if (!orgId) {
            console.log("User not a member of an organization");
            return {
                success: false,
                message: "Você precisa fazer parte de uma organização para enviar um produto",
            };
        }

        await db.update(products)
            .set({
                voteCount: sql`GREATEST(0, vote_count + 1)`,
            })
            .where(eq(products.id, productId));

        revalidatePath("/");

        return {
            success: true,
            message: "Voto positivo registrado com sucesso",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Não foi possível registrar o voto positivo",
            voteCount: 0,
        };
    }
}

export const downvoteProductAction = async (productId: number) => {

    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            console.log("User not signed in");
            return {
                success: false,
                message: "Você precisa entrar na sua conta para enviar um produto",
            };
        }

        if (!orgId) {
            console.log("User not a member of an organization");
            return {
                success: false,
                message: "Você precisa fazer parte de uma organização para enviar um produto",
            };
        }

        await db.update(products)
            .set({
                voteCount: sql`GREATEST(0, vote_count - 1)`,
            })
            .where(eq(products.id, productId));

        revalidatePath("/");

        return {
            success: true,
            message: "Voto negativo registrado com sucesso",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Não foi possível registrar o voto negativo",
            voteCount: 0,
        };
    }
}

export const addProductAction = async (
    prevState: FormState,
    formData: FormData
) => {
    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            return {
                success: false,
                message: "Você precisa entrar na sua conta para enviar um produto",
                errors: undefined,
            };
        }

        if (!orgId) {
            return {
                success: false,
                message: "Você precisa fazer parte de uma organização para enviar um produto",
                errors: undefined,
            };
        }

        const user = await currentUser();
        const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

        const rawFormData = Object.fromEntries(formData.entries());

        //validate the data
        const validatedData = productSchema.safeParse(rawFormData);

        if (!validatedData.success) {
            console.log(validatedData.error.flatten().fieldErrors);
            return {
                success: false,
                errors: validatedData.error.flatten().fieldErrors,
                message: "Dados inválidos",
            };
        }
        const { name, slug, tagline, description, websiteUrl, tags } = validatedData.data;

        const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

        //transform the data
        await db.insert(products).values({
            name,
            slug,
            tagline,
            description,
            websiteUrl,
            tags: tagsArray,
            status: "pending",
            submittedBy: userEmail,
            organizationId: orgId,
            userId,
        });

        return {
            success: true,
            message: "Produto enviado com sucesso! Ele será revisado em breve.",
            errors: undefined,
        };
    } catch (error) {
        console.error(error);

        if (error instanceof z.ZodError) {
            return {
                success: false,
                errors: error.flatten().fieldErrors,
                message: "Não foi possível validar os dados. Confira o formulário.",
            };
        }

        return {
            success: false,
            errors: undefined,
            message: "Não foi possível enviar o produto",
        };
    }
};