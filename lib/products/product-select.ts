import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function getFeaturedProducts() {

    const productsData = await db
        .select()
        .from(products)
        .where(eq(products.status, "approved"))
        .orderBy(desc(products.voteCount));

    return productsData;

}

export async function getRecentlyLaunchedProducts() {

    return [
        {
            id: 1,
            name: "ParityKit",
            description: "A toolkit for creating parity products",
            tags: ["SaaS", "Pricing", "Global"],
            votes: 615,
            isFeatured: true
        },
        {
            id: 2,
            name: "Modern Full Stack Next.js Course",
            description: "Learn to build ",
            tags: ["SaaS", "Pricing", "Global"],
            votes: 615,
            isFeatured: true
        }
    ];
}