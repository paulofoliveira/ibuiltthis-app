"use cache";
import SectionHeader from "@/components/common/section-header";
import ProductExplorer from "@/components/products/product-explorer";
import { getAllApprovedProducts } from "@/lib/products/product-select";
import { CompassIcon } from "lucide-react";

export default async function ExplorePage() {

    const products = await getAllApprovedProducts();

    return (
        <div className="py-20">
            <div className="wrapper">
                <div className="mb-12">
                    <SectionHeader
                        title="Explore todos os produtos"
                        icon={CompassIcon}
                        description="Explore e descubra projetos incríveis da nossa comunidade"
                    />
                </div>
                <ProductExplorer products={products} />
            </div>
        </div>
    );
}