import SectionHeader from "@/components/common/section-header";
import ProductSubmitForm from "@/components/products/product-submit-form";
import { SparklesIcon } from "lucide-react";

export default function SubmitPage() {
    return (
        <section className="py-20">
            <div className="wrapper">
                <div className="mb-12">
                    <SectionHeader
                        title="Envie seu produto"
                        icon={SparklesIcon}
                        description="Compartilhe sua criação com a comunidade. Seu produto será revisado antes de ser publicado."
                    />
                </div>
                <div className="max-w-2xl mx-auto">
                    <ProductSubmitForm />
                </div>
            </div>
        </section>
    );
}