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

            {/* DRAWER — agora é flex column: header fixo + nav rolável */}
            <div className={`fixed top-0 left-0 h-full w-90 max-w-[85vw] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
                    menuOpen ? 'translate-x-0' : '-translate-x-full'}`
            }>

                {/* Cabeçalho do drawer – fixo, não rola */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
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

                <div className="h-[2px] mx-6 rounded-full bg-gradient-to-r from-red-400 via-cyan-500 to-violet-500 shrink-0" />

                {/* Conteúdo do drawer – agora rolável, ocupa o espaço restante */}
                <nav className="p-6 space-y-6 flex-1 overflow-y-auto">
                    {view === 'main' ? (
                        <>
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
                                    <a href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-blue-200 hover:bg-blue-300 rounded-full transition-all">
                                    
                                        <FaFacebookF
                                            size={18}
                                            className="text-blue-700"
                                        />
                                    </a>

                                    <a href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-purple-200 hover:bg-purple-300 rounded-full transition-all">
                                    
                                        <FaInstagram
                                            size={18}
                                            className="text-purple-700"
                                        />
                                    </a>

                                    <a href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-green-200 hover:bg-green-300 rounded-full transition-all">
                                    
                                        <FaWhatsapp
                                            size={18}
                                            className="text-green-700"
                                        />
                                    </a>
                                </div>
                            </div>

                            <div className="text-center pt-6">
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