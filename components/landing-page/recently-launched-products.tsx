import { RocketIcon } from "lucide-react";
import SectionHeader from "@/components/common/section-header";
import ProductCard from "@/components/products/product-card";
import EmptyState from "@/components/common/empty-state";
import { getRecentlyLaunchedProducts } from "@/lib/products/product-select";

export default async function RecentlyLaunchedProducts() {

    const recentlyLaunchedProducts = await getRecentlyLaunchedProducts();

    return (
        <section className="py-20">
            <div className="wrapper space-y-12">
                <SectionHeader title="Lançamentos recentes"
                    icon={RocketIcon}
                    description="Descubra os produtos mais recentes da nossa comunidade" />
                {recentlyLaunchedProducts.length > 0 ? (
                    <div className="grid-wrapper">
                        {recentlyLaunchedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <EmptyState message="Nenhum produto foi lançado na última semana. Volte em breve para conferir as novidades." />
                )}
            </div>
        </section>
    );
}