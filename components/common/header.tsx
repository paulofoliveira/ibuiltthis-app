import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import { CompassIcon, HomeIcon, LoaderIcon, SparkleIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Button } from "../ui/button";
import CustomUserButton from "./custom-user-button";

const Logo = () => {
    return (
        <Link href="/" className="flex shrink-0 items-center gap-2 group">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
                <SparkleIcon className="size-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">
                i<span className="text-primary">Built</span>This
            </span>
        </Link>
    );
};
export default function Header() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="wrapper">
                <div className="flex min-h-16 flex-wrap items-center justify-center gap-x-3 gap-y-2 py-2 md:justify-between md:py-0">
                    <Logo />
                    <nav aria-label="Navegação principal" className="order-last flex w-full items-center justify-center gap-1 border-t pt-2 md:order-none md:w-auto md:border-0 md:pt-0">
                        <Link
                            href="/"
                            className="flex min-h-11 items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50">
                            <HomeIcon className="size-4" />
                            <span>Início</span>
                        </Link>
                        <Link
                            href="/explore"
                            className="flex min-h-11 items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted/50">
                            <CompassIcon className="size-4" />
                            <span>Explorar</span>
                        </Link>
                    </nav>

                    <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end md:gap-3">
                        <Suspense
                            fallback={
                                <div>
                                    <LoaderIcon className="size-4 animate-spin" />
                                </div>
                            }>
                            <Show when="signed-out">
                                <SignInButton>
                                    <Button variant="ghost" className="h-11 px-2 text-xs sm:px-4 sm:text-sm">Entrar</Button>
                                </SignInButton>
                                <SignUpButton>
                                    <Button className="h-11 px-2 text-xs sm:px-4 sm:text-sm">Criar conta</Button>
                                </SignUpButton>
                            </Show>
                            <Show when="signed-in">
                                <Button asChild className="h-11 px-2 text-xs sm:px-4 sm:text-sm">
                                    <Link href="/submit">
                                        <SparklesIcon className="size-4" />
                                        Enviar projeto
                                    </Link>
                                </Button>
                                <CustomUserButton />
                            </Show>
                        </Suspense>
                    </div>
                </div>
            </div>
        </header>
    );
}
