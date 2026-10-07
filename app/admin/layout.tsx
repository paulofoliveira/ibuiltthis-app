import { Suspense } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div>
            <Suspense fallback={<div>Carregando painel administrativo...</div>}>{children}</Suspense>
        </div>
    );
}