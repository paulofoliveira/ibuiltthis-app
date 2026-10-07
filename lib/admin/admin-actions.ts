"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductType } from "@/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const approveProductAction = async (productId: ProductType["id"]) => {

    console.log("Approve product", productId);

    try {
        await db.update(products)
            .set({ status: "approved", approvedAt: new Date() })
            .where(eq(products.id, productId));

        revalidatePath("/admin");

        return {
            success: true,
            message: "Produto aprovado com sucesso",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Não foi possível aprovar o produto",
        };
    }
};

export const rejectProductAction = async (productId: ProductType["id"]) => {

    console.log("Reject product", productId);

    try {
        await db.update(products)
            .set({ status: "rejected" })
            .where(eq(products.id, productId));

        revalidatePath("/admin");

        return {
            success: true,
            message: "Produto rejeitado com sucesso",
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Não foi possível rejeitar o produto",
        };
    }
};