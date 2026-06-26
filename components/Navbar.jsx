'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import axios from 'axios'
import Image from "next/image";
import FAV_3_LOGO from '../public/logo/FAV_3_LOGO.png'

import {
    SearchIcon,
    LayoutDashboardIcon,
    Menu,
    X,
    Mail,
    FolderOpen,
    Info,
    Phone as PhoneIcon,
    ArrowLeft,        // ➕ importado para o botão voltar
} from "lucide-react"

import {
    FaFacebookF,
    FaInstagram,
    FaWhatsapp,
} from "react-icons/fa"

import {
    useUser,
    UserButton,
    SignInButton,
} from "@clerk/nextjs"

export default function Navbar() {
    const { user, isLoaded } = useUser()
    const [query, setQuery] = useState("")
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)
    const [view, setView] = useState('main')        // ➕ 'main' ou 'categories'
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)   // ➕ para feedback

    const isAdmin = isLoaded && user && user.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL

    // Busca categorias ao montar (mantido como você já tinha)
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true)
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data.data || []);
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchCategories();
    }, []);

    // ➕ Função para abrir a lista de categorias
    const handleOpenCategories = () => {
        setView('categories')
        // Se quiser recarregar a cada abertura, descomente a linha abaixo:
        // fetchCategories()
    }

    // ➕ Função para voltar ao menu principal
    const handleBackToMain = () => {
        setView('main')
    }

    // ➕ Fechar o drawer (resetando a view para main)
    const handleCloseMenu = () => {
        setMenuOpen(false)
        setView('main')
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        }
    }

    return (
        <>
            {/* Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
                    onClick={handleCloseMenu}
                />
            )}

            <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-[1440px] mx-auto px-6 md:px-16 lg:px-32 py-4 flex items-center justify-between gap-4">
                    
                    {/* Botão do Menu */}
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
                        aria-label="Abrir menu"
                    >
                        <Menu size={24} />
                        <span className="text-sm font-medium hidden sm:inline">MENU</span>
                    </button>

                    {/* Logo */}
                            <Link href="/" className="flex items-center">

                                {/* Desktop */}
                                <div className="hidden md:block relative">

                                    <span className="text-4xl font-semibold text-slate-800">
                                        <span className="bg-gradient-to-r
                                            from-indigo-500
                                            via-fuchsia-500
                                            via-30%
                                            via-rose-500
                                            via-60%
                                            to-amber-500
                                            bg-clip-text
                                            text-transparent
                                            animate-gradient">

                                            .Prisma

                                        </span>

                                        Ofertas
                                    </span>

                                    <p className="absolute
                                        text-xs
                                        font-semibold
                                        -top-2
                                        -right-6
                                        px-3
                                        p-0.5
                                        rounded-full
                                        flex
                                        items-center
                                        gap-2
                                        bg-gradient-to-r
                                        from-indigo-500
                                        via-fuchsia-500
                                        via-30%
                                        via-rose-500
                                        via-60%
                                        to-amber-500
                                        bg-clip-text
                                        text-transparent
                                        animate-gradient">

                                        store

                                    </p>

                                </div>

                                {/* Mobile / Tablet */}
                                <div className="block md:hidden">

                                    <Image
                                        src={FAV_3_LOGO}
                                        alt="PrismaOfertas"
                                        width={42}
                                        height={42}
                                        priority
                                        className="transition-transform duration-300 hover:scale-105"
                                    />

                                </div>

                            </Link>

                    {/* Desktop Menu */}
                        <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-800 px-10">
                            <Link href="/" className="flex items-center gap-1 transition-all duration-300
                                                hover:bg-gradient-to-r hover:from-red-500
                                                hover:via-cyan-600 hover:to-violet-500
                                                hover:bg-clip-text hover:text-transparent">Inicio</Link>
                            <Link href="/shop" className="flex items-center gap-1 transition-all duration-300
                                                hover:bg-gradient-to-r hover:from-red-500
                                                hover:via-cyan-600 hover:to-violet-500
                                                hover:bg-clip-text hover:text-transparent">Loja</Link>

                            {/* ↓ SUBSTITUIR O LINK DE CATEGORIAS POR ESTE BLOCO */}
                            <div
                                className="relative group"
                                onMouseEnter={() => {}}
                                onMouseLeave={() => {}}
                            >
                                {/* Trigger */}
                                <button className="flex items-center gap-1 transition-all duration-300
                                                hover:bg-gradient-to-r hover:from-red-500
                                                hover:via-cyan-600 hover:to-violet-500
                                                hover:bg-clip-text hover:text-transparent">
                                    Categorias
                                    <svg
                                        className="w-3.5 h-3.5 mt-0.5 transition-transform duration-300
                                                group-hover:rotate-180 text-slate-400"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3
                                                w-[680px] bg-white rounded-2xl shadow-2xl
                                                border border-slate-100 p-5 z-50
                                                opacity-0 invisible
                                                group-hover:opacity-100 group-hover:visible
                                                transition-all duration-200 ease-out
                                                translate-y-2 group-hover:translate-y-0">

                                    {/* Triângulo decorativo */}
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2
                                                    w-4 h-4 bg-white border-l border-t
                                                    border-slate-100 rotate-45" />

                                    {/* Header do dropdown */}
                                    <p className="text-xs font-bold text-slate-700 uppercase
                                                tracking-widest mb-4 pb-3
                                                border-b border-slate-100">
                                        Todas as Categorias
                                    </p>

                                    {/* Grid 3 colunas */}
                                    {categories.length > 0 ? (
                                        <div className="grid grid-cols-3 gap-x-4 gap-y-2">
                                            {categories.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    href={`/category/${cat.slug}`}
                                                    className="text-sm text-slate-600 py-1.5 px-2
                                                            rounded-lg hover:bg-cyan-100
                                                            hover:text-cyan-800 font-medium
                                                            transition-all duration-150
                                                            truncate"
                                                >
                                                    {cat.name}
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500 text-center py-4">
                                            Carregando categorias...
                                        </p>
                                    )}

                                    {/* Rodapé com link para todas */}
                                    <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                                        <Link
                                            href="/shop"
                                            className="text-sm font-semibold text-cyan-600
                                                    py-1.5 px-2 rounded-lg hover:bg-cyan-100 hover:text-cyan-800 transition-colors"
                                        >
                                            Ver todos os produtos →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {/* ↑ FIM DO BLOCO */}

                            <Link href="/sobre" className="flex items-center gap-1 transition-all duration-300
                                                hover:bg-gradient-to-r hover:from-red-500
                                                hover:via-cyan-600 hover:to-violet-500
                                                hover:bg-clip-text hover:text-transparent">Sobre</Link>
                            <Link href="/contato" className="flex items-center gap-1 transition-all duration-300
                                                hover:bg-gradient-to-r hover:from-red-500
                                                hover:via-cyan-600 hover:to-violet-500
                                                hover:bg-clip-text hover:text-transparent">Contato</Link>
                        </div>

                    {/* Busca */}
                    <form
                        onSubmit={handleSearch}
                        className="flex-grow max-w-xl flex items-center bg-slate-100 rounded-2xl px-4 py-2.5 border border-transparent focus-within:border-indigo-100 focus-within:bg-white transition-all shadow-inner"
                    >
                        <SearchIcon size={18} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Encontre ofertas..."
                            className="bg-transparent border-none outline-none w-full ml-3 text-slate-900 placeholder:text-slate-400 text-sm font-light"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>

                    {/* Admin */}
                    <div className="flex items-center gap-2">
                        {isLoaded && !user && (
                            <SignInButton mode="modal">
                            <button className="text-sm font-semibold text-white bg-slate-800 hover:bg-slate-900 px-4 py-2 rounded-xl transition-all active:scale-95">
                                Entrar
                            </button>
                            </SignInButton>
                        )}

                        {isAdmin && (
                            <Link href="/admin" className="p-2.5 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-xl transition-all" title="Dashboard Admin">
                            <LayoutDashboardIcon size={22} />
                            </Link>
                        )}

                        {/* UserButton aparece para qualquer usuário logado, não só admin */}
                        {isLoaded && user && (
                            <UserButton afterSignOutUrl="/" />
                        )}
                    </div>
                </div>
            </header>

            {/* DRAWER */}
            {/* DRAWER */}
<div className={`fixed top-0 left-0 h-full w-90 max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'}`
}>

    {/* Cabeçalho do drawer – condicional */}
    <div className="flex items-center justify-between p-6 border-b border-slate-100">
        {view === 'main' ? (
            <Link href="/" className="relative text-4xl font-semibold text-slate-800">
                <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">
                    .Prisma
                </span>
                Ofertas
                <span className="text-green-600 text-5xl leading-0"></span>

                <p className="absolute text-xs font-semibold -top-2 -right-6 px-3 p-0.5 rounded-full flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">
                    store
                </p>
            </Link>
        ) : (
            // ➕ Botão Voltar (quando na view de categorias)
            <button
                onClick={handleBackToMain}
                className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors text-lg font-medium"
            >
                <ArrowLeft size={24} />
                <span>Voltar</span>
            </button>
        )}

        <button
            onClick={handleCloseMenu}
            className="p-2 text-slate-500 hover:bg-slate-200 rounded-xl transition-all"
            aria-label="Fechar menu"
        >
            <X size={24} />
        </button>
    </div>

    <div className="h-[2px] mx-6 rounded-full bg-gradient-to-r from-red-400 via-cyan-500 to-violet-500" />

    {/* Conteúdo do drawer – condicional */}
    <nav className="p-6 space-y-6">
        {view === 'main' ? (
                        <>
                            {/* ---------- MENU PRINCIPAL ---------- */}
                        
                            <ul className="space-y-5">
                                <p className="text-center text-sm text-slate-800 mt-1 text-xl">
                                    Explore o conteúdo do site
                                </p>

                                <hr />

                                <li>
                                    <Link
                                        href="/newsletter"
                                        className="flex items-center gap-3 text-slate-700 hover:text-cyan-600 transition-colors text-lg"
                                        onClick={handleCloseMenu}
                                    >
                                        <Mail size={20} />
                                        Newsletter
                                    </Link>
                                </li>

                                <li>
                                    {/* ➕ Agora é um botão, não um Link */}
                                    <button
                                        onClick={handleOpenCategories}
                                        className="flex items-center gap-3 text-slate-700 hover:text-cyan-600 transition-colors text-lg w-full text-left"
                                    >
                                        <FolderOpen size={20} />
                                        Todas as Categorias
                                    </button>
                                </li>

                                <li>
                                    <Link
                                        href="/sobre"
                                        className="flex items-center gap-3 text-slate-700 hover:text-cyan-600 transition-colors text-lg"
                                        onClick={handleCloseMenu}
                                    >
                                        <Info size={20} />
                                        Sobre
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/contato"
                                        className="flex items-center gap-3 text-slate-700 hover:text-cyan-600 transition-colors text-lg"
                                        onClick={handleCloseMenu}
                                    >
                                        <PhoneIcon size={20} />
                                        Contato
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        href="/privacidade"
                                        className="flex items-center gap-3 text-slate-700 hover:text-cyan-600 transition-colors text-lg"
                                        onClick={handleCloseMenu}
                                    >
                                        <SearchIcon size={20} />
                                        Política de Privacidade
                                    </Link>
                                </li>

                                <div className="h-[2px] mx-6 rounded-full bg-gradient-to-r from-red-400 via-cyan-500 to-violet-500" />
                            </ul>

                            {/* Redes sociais – apenas na view main */}
                            <div className="border-t border-slate-100">
                                <p className="text-sm text-slate-800 mb-5">
                                    Siga-nos
                                </p>

                                <div className="flex gap-5">
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-blue-200 hover:bg-blue-300 rounded-full transition-all"
                                    >
                                        <FaFacebookF
                                            size={18}
                                            className="text-blue-700"
                                        />
                                    </a>

                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-purple-200 hover:bg-purple-300 rounded-full transition-all"
                                    >
                                        <FaInstagram
                                            size={18}
                                            className="text-purple-700"
                                        />
                                    </a>

                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-green-200 hover:bg-green-300 rounded-full transition-all"
                                    >
                                        <FaWhatsapp
                                            size={18}
                                            className="text-green-700"
                                        />
                                    </a>
                                </div>
                            </div>

                            <div className="absolute text-center bottom-6 left-6 right-6">
                                <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

                                <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">
                                    .Prisma
                                </span>

                                Ofertas Copyright © {new Date().getFullYear()}

                                <span className="text-green-600 text-5xl leading-0"></span>
                            </div>
                        </>
                        ) : (
                        // ---------- LISTA DE CATEGORIAS ----------
                        <div>
                            <h3 className="text-sm font-medium text-slate-800 uppercase tracking-wider mb-4">
                                Categorias
                            </h3>

                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                </div>
                            ) : categories.length > 0 ? (
                                <ul className="space-y-3">
                                    {categories.map((cat) => (
                                        <li key={cat.id}>
                                            <Link
                                                href={`/category/${cat.slug || cat.id}`}
                                                className="block text-slate-700 hover:text-cyan-600 transition-colors text-base"
                                                onClick={handleCloseMenu}
                                            >
                                                {cat.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-400 text-sm">
                                    Nenhuma categoria encontrada.
                                </p>
                            )}
                        </div>
                    )}
                </nav>
            </div>
        </>
    )
}