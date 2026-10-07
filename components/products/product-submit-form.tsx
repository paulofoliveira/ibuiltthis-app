"use client";

import { FormField } from "@/components/forms/form-field";
import { Button } from "@/components/ui/button";
import { addProductAction } from "@/lib/products/product-actions";
import { cn } from "@/lib/utils";
import { FormState } from "@/types";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { useActionState } from "react";

const initialState: FormState = {
    success: false,
    errors: undefined,
    message: "",
};

export default function ProductSubmitForm() {
    const [state, formAction, isPending] = useActionState(
        addProductAction,
        initialState
    );

    const { errors, message, success } = state;
    const getFieldErrors = (fieldName: string): string[] => {
        if (!errors) return [];
        return (errors as Record<string, string[]>)[fieldName] ?? [];
    };

    return (
        <form className="space-y-6" action={formAction}>
            {message && (
                <div className={cn(
                    "p-4 rounded-lg border",
                    success
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-destructive/10 border-destructive text-destructive"
                )}
                    role="alert"
                    aria-live="polite">
                    {message}
                </div>
            )}
            <FormField label="Nome do produto"
                name="name"
                id="name"
                placeholder="Meu produto incrível"
                required
                onChange={() => { }}
                error={getFieldErrors("name")} />

            <FormField label="Endereço do produto"
                name="slug"
                id="slug"
                placeholder="meu-produto-incrivel"
                required
                onChange={() => { }}
                helperText="Versão do nome do produto para usar na URL"
                error={getFieldErrors("slug")} />

            <FormField label="Descrição curta"
                name="tagline"
                id="tagline"
                placeholder="Uma descrição breve e atraente"
                required
                onChange={() => { }}
                error={getFieldErrors("tagline")} />

            <FormField label="Descrição"
                name="description"
                id="description"
                placeholder="Conte mais sobre seu produto..."
                required
                onChange={() => { }}
                error={getFieldErrors("description")}
                textarea />

            <FormField label="URL do site"
                name="websiteUrl"
                id="websiteUrl"
                placeholder="https://seuproduto.com"
                required
                onChange={() => { }}
                error={getFieldErrors("websiteUrl")}
                helperText="Informe o site ou a página de apresentação do seu produto" />

            <FormField label="Categorias"
                name="tags"
                id="tags"
                placeholder="IA, Produtividade, SaaS"
                required
                onChange={() => { }}
                error={getFieldErrors("tags")}
                helperText="Categorias separadas por vírgulas (ex.: IA, SaaS, Produtividade)" />

            <Button type="submit" size="lg" className="w-full">
                {isPending ? (
                    <Loader2Icon className="size-4 animate-spin" />
                ) : (
                    <>
                        <SparklesIcon className="size-4" />
                        Enviar produto
                    </>
                )}
            </Button>
        </form>
    );
}