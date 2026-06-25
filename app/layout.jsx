import { Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

import {
    ClerkProvider,
} from "@clerk/nextjs";

import { ptBR } from "@clerk/localizations";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata = {
    title: ".PrismaOfertas",
    description: "Encontre as melhores ofertas selecionadas da Amazon, Shopee e mais. Tecnologia com desconto e segurança.",
};

export default function RootLayout({ children }) {
    return (
        <ClerkProvider localization={ptBR}> 
            <html lang="pt-BR">
                <body className={`${outfit.className} antialiased`}>
                    <Toaster />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
