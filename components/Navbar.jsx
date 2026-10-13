'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import Image from "next/image";
import FAV_3_LOGO from '../public/logo/FAV_3_LOGO.png'
import { useCategories } from '@/hooks/useCategories'

import {
    SearchIcon,
    LayoutDashboardIcon,
    Menu,
    X,
    Mail,
    FolderOpen,
    Info,
    Phone as PhoneIcon,
    ArrowLeft,
    Loader2,
    Home,
    Store,
    ShieldCheck,
    ChevronRight,
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

// Item do menu lateral: cor de fundo no hover (vale para desktop e mobile)
const drawerLinkClass =
    "group flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[15px] text-left text-cyan-600 transition-colors hover:bg-cyan-200 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"

const drawerIconClass = "text-cyan-500 group-hover:text-cyan-900 transition-colors shrink-0"

export default function Navbar() {
    const { user, isLoaded } = useUser()
    const [query, setQuery] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [suggestLoading, setSuggestLoading] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const searchInputRef = useRef(null)
    const router = useRouter()
    const [menuOpen, setMenuOpen] = useState(false)
    const [view, setView] = useState('main')
    const { categories, loading } = useCategories()

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R$'

    const isAdmin = isLoaded && user && user.primaryEmailAddress?.emailAddress === process.env.NEXT_PUBLIC_ADMIN_EMAIL

    const handleOpenCategories = () => {
        setView('categories')
    }

    const handleBackToMain = () => {
        setView('main')
    }

    const handleCloseMenu = () => {
        setMenuOpen(false)
        setView('main')
    }

    const closeSearch = () => {
        setIsSearchOpen(false)
        setQuery("")
        setSuggestions([])
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (query.trim()) {
            const term = query.trim()
            closeSearch()
            router.push(`/search?q=${encodeURIComponent(term)}`)
        }
    }

    // Atalho de teclado: Cmd/Ctrl+K abre, Esc fecha
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault()
                setIsSearchOpen((prev) => !prev)
            }
            if (e.key === 'Escape') {
                closeSearch()
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    // Autofoco no input + trava o scroll do body quando o modal abre
    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden'
            const timer = setTimeout(() => searchInputRef.current?.focus(), 50)
            return () => clearTimeout(timer)
        } else {
            document.body.style.overflow = ''
        }
    }, [isSearchOpen])

    // Busca instantânea com debounce
    useEffect(() => {
        const term = query.trim()

        if (term.length < 2) {
            setSuggestions([])
            setSuggestLoading(false)
            return
        }

        setSuggestLoading(true)
        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`/api/products?search=${encodeURIComponent(term)}&limit=6`)
                if (res.ok) {
                    const data = await res.json()
                    setSuggestions(data.products || [])
                }
            } catch (error) {
                console.error("[SEARCH_SUGGEST_ERROR]", error)
            } finally {
                setSuggestLoading(false)
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [query])

    const handleSuggestionClick = () => {
        closeSearch()
    }

    return (
        <>
            {/* Overlay do menu lateral */}
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
                        className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-blue-200 rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
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

                            <div
                                className="relative group"
                                onMouseEnter={() => {}}
                                onMouseLeave={() => {}}
                            >
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

                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3
                                                w-[680px] bg-white rounded-2xl shadow-2xl
                                                border border-slate-100 p-5 z-50
                                                opacity-0 invisible
                                                group-hover:opacity-100 group-hover:visible
                                                transition-all duration-200 ease-out
                                                translate-y-2 group-hover:translate-y-0">

                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2
                                                    w-4 h-4 bg-white border-l border-t
                                                    border-slate-100 rotate-45" />

                                    <p className="text-xs font-bold text-slate-700 uppercase
                                                tracking-widest mb-4 pb-3
                                                border-b border-slate-100">
                                        Todas as Categorias
                                    </p>

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

                            <Link href="/sobre" className="flex items-center gap-1 transition-all duration-300
                                                hover:bg-gradient-to-r hover:from-red-500
                                                hover:via-cyan-600 hover:to-violet-500
                                                hover:bg-clip-text hover:text-transparent">Sobre</Link>
                            <Link href="/contato" className="flex items-center gap-1 transition-all duration-300
                                                hover:bg-gradient-to-r hover:from-red-500
                                                hover:via-cyan-600 hover:to-violet-500
                                                hover:bg-clip-text hover:text-transparent">Contato</Link>
                        </div>

                    {/* Botão de busca — abre o command palette */}
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center gap-2 flex-grow max-w-xs sm:max-w-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-xl px-3.5 py-2.5 text-left transition-all"
                        aria-label="Abrir busca"
                    >
                        <SearchIcon size={17} className="text-slate-400 shrink-0" />
                        <span className="text-sm text-slate-400 font-light truncate flex-1">
                            Buscar produtos...
                        </span>
                        <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-md px-1.5 py-0.5 shrink-0">
                            ⌘K
                        </kbd>
                    </button>

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

                        {isLoaded && user && (
                            <UserButton afterSignOutUrl="/" />
                        )}
                    </div>
                </div>
            </header>

            {/* COMMAND PALETTE — modal de busca */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 sm:pt-32 px-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        onClick={closeSearch}
                    />

                    <div className="relative w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
                        <form onSubmit={handleSearch} className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
                            {suggestLoading ? (
                                <Loader2 size={19} className="text-slate-400 animate-spin shrink-0" />
                            ) : (
                                <SearchIcon size={19} className="text-slate-400 shrink-0" />
                            )}
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Buscar fones, eletrônicos, casa..."
                                className="bg-transparent border-none outline-none w-full text-slate-900 placeholder:text-slate-400 text-base"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={closeSearch}
                                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all shrink-0"
                                aria-label="Fechar busca"
                            >
                                <X size={18} />
                            </button>
                        </form>

                        {/* Resultados */}
                        <div className="max-h-[60vh] overflow-y-auto">
                            {query.trim().length < 2 ? (
                                <p className="text-sm text-slate-400 text-center py-10 px-4">
                                    Digite ao menos 2 letras para buscar
                                </p>
                            ) : suggestLoading && suggestions.length === 0 ? (
                                <div className="flex items-center justify-center py-10">
                                    <Loader2 size={20} className="text-slate-400 animate-spin" />
                                </div>
                            ) : suggestions.length > 0 ? (
                                <>
                                    <ul>
                                        {suggestions.map((product) => (
                                            <li key={product.id} className="border-b border-slate-100 last:border-b-0">
                                                <Link
                                                    href={`/product/${product.id}`}
                                                    onClick={handleSuggestionClick}
                                                    className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors"
                                                >
                                                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 shrink-0 relative">
                                                        {product.images?.[0] && (
                                                            <Image
                                                                src={product.images[0]}
                                                                alt={product.name}
                                                                fill
                                                                sizes="44px"
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm text-slate-800 font-medium truncate">
                                                            {product.name}
                                                        </p>
                                                        {product.category?.name && (
                                                            <p className="text-xs text-slate-400 truncate">
                                                                {product.category.name}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <p className="text-sm font-semibold text-slate-800 shrink-0">
                                                        {currency} {Number(product.price).toFixed(2)}
                                                    </p>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={handleSearch}
                                        className="w-full text-center text-sm font-semibold text-cyan-600 hover:bg-slate-50 py-3.5 border-t border-slate-100 transition-colors"
                                    >
                                        Ver todos os resultados para "{query.trim()}"
                                    </button>
                                </>
                            ) : (
                                <p className="text-sm text-slate-400 text-center py-10 px-4">
                                    Nenhum produto encontrado para "{query.trim()}"
                                </p>
                            )}
                        </div>

                        <div className="hidden sm:flex items-center justify-end gap-1.5 px-5 py-2.5 border-t border-slate-100 bg-slate-50 text-[11px] text-slate-400">
                            Pressione
                            <kbd className="bg-white border border-slate-200 rounded px-1.5 py-0.5 font-semibold text-slate-500">Esc</kbd>
                            para fechar
                        </div>
                    </div>
                </div>
            )}

            {/* DRAWER — flex column: cabeçalho fixo + navegação rolável + rodapé fixo (mesmo menu no desktop e no mobile) */}
            <div className={`fixed top-0 left-0 h-full w-70 max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
                    menuOpen ? 'translate-x-0' : '-translate-x-full'}`
            }>

                {/* Cabeçalho do drawer – fixo, não rola */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
                    {view === 'main' ? (
                        <Link
                            href="/"
                            onClick={handleCloseMenu}
                            className="relative text-2xl font-semibold text-slate-800"
                        >
                            <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">
                                .Prisma
                            </span>
                            Ofertas

                            <span className="absolute -top-1.5 -right-8 text-[10px] font-semibold bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">
                                store
                            </span>
                        </Link>
                    ) : (
                        <button
                            onClick={handleBackToMain}
                            className="flex items-center gap-2 -ml-2 px-2 py-1.5 rounded-md text-slate-600 hover:bg-cyan-200 hover:text-slate-900 transition-colors text-base font-medium"
                        >
                            <ArrowLeft size={20} />
                            <span>Voltar</span>
                        </button>
                    )}

                    <button
                        onClick={handleCloseMenu}
                        className="p-2 text-slate-500 hover:bg-blue-200 hover:text-slate-900 rounded-md transition-colors"
                        aria-label="Fechar menu"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="h-[2px] mx-5 rounded-full bg-gradient-to-r from-red-400 via-cyan-500 to-violet-500 shrink-0" />

                {/* Conteúdo do drawer – rolável */}
                <nav className="flex-1 overflow-y-auto px-3 py-4">
                    {view === 'main' ? (
                        <>
                            <ul className="space-y-1">
                                <li>
                                    <Link href="/" className={drawerLinkClass} onClick={handleCloseMenu}>
                                        <Home size={19} className={drawerIconClass} />
                                        Início
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/shop" className={drawerLinkClass} onClick={handleCloseMenu}>
                                        <Store size={19} className={drawerIconClass} />
                                        Loja
                                    </Link>
                                </li>

                                <li>
                                    <button onClick={handleOpenCategories} className={drawerLinkClass}>
                                        <FolderOpen size={19} className={drawerIconClass} />
                                        Todas as categorias
                                        <ChevronRight size={17} className="ml-auto text-slate-900" />
                                    </button>
                                </li>

                                <li>
                                    <Link href="/newsletter" className={drawerLinkClass} onClick={handleCloseMenu}>
                                        <Mail size={19} className={drawerIconClass} />
                                        Newsletter
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/sobre" className={drawerLinkClass} onClick={handleCloseMenu}>
                                        <Info size={19} className={drawerIconClass} />
                                        Sobre
                                    </Link>
                                </li>

                                <li>
                                    <Link href="/contato" className={drawerLinkClass} onClick={handleCloseMenu}>
                                        <PhoneIcon size={19} className={drawerIconClass} />
                                        Contato
                                    </Link>
                                </li>
                            </ul>

                            <div className="my-4 mx-3 h-px bg-slate-300" />

                            <ul>
                                <li>
                                    <Link href="/privacidade" className={drawerLinkClass} onClick={handleCloseMenu}>
                                        <ShieldCheck size={19} className={drawerIconClass} />
                                        Política de privacidade
                                    </Link>
                                </li>
                            </ul>

                            {/* Redes sociais – apenas na view main */}
                            <div className="mt-6 px-3">
                                <p className="text-sm text-slate-500 mb-3">Siga-nos</p>

                                <div className="flex gap-2">
                                    <a href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Facebook"
                                        className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-700 transition-colors">
                                        <FaFacebookF size={15} />
                                    </a>

                                    <a href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                        className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-fuchsia-50 hover:border-fuchsia-500 hover:text-fuchsia-700 transition-colors">
                                        <FaInstagram size={16} />
                                    </a>

                                    <a href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="WhatsApp"
                                        className="w-9 h-9 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-green-50 hover:border-green-500 hover:text-green-700 transition-colors">
                                        <FaWhatsapp size={16} />
                                    </a>
                                </div>
                            </div>
                        </>
                    ) : (
                        // ---------- LISTA DE CATEGORIAS ----------
                        <div>
                            <h3 className="px-3 mb-2 text-sm font-semibold text-slate-800">
                                Categorias
                            </h3>

                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                </div>
                            ) : categories.length > 0 ? (
                                <ul className="space-y-1">
                                    {categories.map((cat) => (
                                        <li key={cat.id}>
                                            <Link
                                                href={`/category/${cat.slug || cat.id}`}
                                                className={drawerLinkClass}
                                                onClick={handleCloseMenu}
                                            >
                                                {cat.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="px-3 text-slate-400 text-sm">
                                    Nenhuma categoria encontrada.
                                </p>
                            )}
                        </div>
                    )}
                </nav>

                {/* Rodapé do drawer – fixo */}
                <div className="shrink-0 border-t border-slate-100 px-5 py-4 text-xs text-slate-500 text-center">
                    <span className="bg-gradient-to-r from-indigo-500 via-fuchsia-500 via-30% via-rose-500 via-60% to-amber-500 bg-clip-text text-transparent animate-gradient">
                        .Prisma
                    </span>
                    Ofertas © {new Date().getFullYear()}
                </div>
            </div>
        </>
    )
}