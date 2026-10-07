import AdminProductCard from "@/components/admin/admin-product-card";
import StatsCard from "@/components/admin/stats-card";
import EmptyState from "@/components/common/empty-state";
import SectionHeader from "@/components/common/section-header";
import { getAllProducts } from "@/lib/products/product-select";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { InboxIcon, ShieldIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default async function AdminPage() {

    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const response = await clerkClient();
    const user = await response.users.getUser(userId!);

    const metadata = user.publicMetadata;
    const isAdmin = metadata?.isAdmin ?? false;

    if (!isAdmin) {
        redirect("/");
    }

    const allProducts = await getAllProducts();
    const approvedProducts = allProducts.filter((product) => product.status === "approved");
    const pendingProducts = allProducts.filter((product) => product.status === "pending");
    const rejectedProducts = allProducts.filter((product) => product.status === "rejected");

    return (
        <div className="py-20">
            <div className="wrapper">
                <div className="mb-12">
                    <SectionHeader title="Administração de produtos"
                        icon={ShieldIcon}
                        description="Revise e gerencie os produtos enviados" />
                </div>
                <StatsCard approved={approvedProducts.length}
                    pending={pendingProducts.length}
                    rejected={rejectedProducts.length}
                    all={allProducts.length} />

                <section className="my-12">
                    <div className="section-header-with-count">
                        <h2 className="text-2xl font-bold">
                            Produtos pendentes ({pendingProducts.length})
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {pendingProducts.length === 0 && (
                            <EmptyState message="Nenhum produto pendente de revisão"
                                icon={InboxIcon} />
                        )}
                        {pendingProducts.map((product) => (
                            <AdminProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>

                <section className="my-12">
                    <div className="section-header-with-count">
                        <h2 className="text-2xl font-bold">Todos os produtos</h2>
                    </div>
                    <div className="space-y-4">
                        {allProducts.map((product) => (
                            <AdminProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}