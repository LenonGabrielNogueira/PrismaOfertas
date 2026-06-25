'use client'
import { useEffect, useState } from "react"
import Loading from "@/components/Loading"
import Image from "next/image"
import axios from "axios"
import toast from "react-hot-toast"
import Link from "next/link"
import {
       PackageSearchIcon,
       ToggleLeftIcon,
       ToggleRightIcon,
       Trash2Icon,
       ExternalLinkIcon,
       PencilIcon
   } from "lucide-react"

export default function AdminProducts() {

    const [products, setProducts]   = useState([])
    const [loading, setLoading]     = useState(true)

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('/api/products')
            setProducts(data.products || [])
        } catch (error) {
            toast.error("Erro ao carregar produtos")
        } finally {
            setLoading(false)
        }
    }

    const toggleActive = async (productId, currentStatus) => {
        try {
            await axios.patch(`/api/products/${productId}`, {
                isActive: !currentStatus
            })
            setProducts(prev =>
                prev.map(p =>
                    p.id === productId
                        ? { ...p, isActive: !currentStatus }
                        : p
                )
            )
            toast.success(
                !currentStatus ? "Produto ativado" : "Produto desativado"
            )
        } catch {
            toast.error("Erro ao atualizar produto")
        }
    }

    const deleteProduct = async (productId) => {
        if (!confirm("Tem certeza que deseja deletar este produto?")) return
        try {
            await axios.delete(`/api/products/${productId}`)
            setProducts(prev => prev.filter(p => p.id !== productId))
            toast.success("Produto deletado")
        } catch {
            toast.error("Erro ao deletar produto")
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-slate-500 mb-20">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl">
                    Gerenciar{" "}
                    <span className="text-slate-800 font-medium">Produtos</span>
                </h1>
                <span className="text-xs bg-slate-100 text-slate-500
                                 px-3 py-1 rounded-full">
                    {products.length} produtos
                </span>
            </div>

            {products.length === 0 ? (
                <div className="flex flex-col items-center justify-center
                                py-24 bg-slate-50 rounded-2xl
                                border-2 border-dashed border-slate-200">
                    <PackageSearchIcon size={40}
                        className="text-slate-300 mb-4" />
                    <p className="text-slate-500 font-medium">
                        Nenhum produto cadastrado
                    </p>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl
                                border border-slate-200">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs
                                               font-semibold text-slate-500
                                               uppercase tracking-wider">
                                    Produto
                                </th>
                                <th className="py-3 px-4 text-left text-xs
                                               font-semibold text-slate-500
                                               uppercase tracking-wider">
                                    Plataforma
                                </th>
                                <th className="py-3 px-4 text-left text-xs
                                               font-semibold text-slate-500
                                               uppercase tracking-wider">
                                    Preço
                                </th>
                                <th className="py-3 px-4 text-left text-xs
                                               font-semibold text-slate-500
                                               uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="py-3 px-4 text-left text-xs
                                               font-semibold text-slate-500
                                               uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map((product) => (
                                <tr key={product.id}
                                    className="hover:bg-slate-50 transition">
                                    {/* Produto */}
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            {product.images?.[0] ? (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    width={40}
                                                    height={40}
                                                    className="w-10 h-10
                                                               rounded-lg
                                                               object-cover
                                                               border
                                                               border-slate-100"
                                                />
                                            ) : (
                                                <div className="w-10 h-10
                                                                rounded-lg
                                                                bg-slate-100
                                                                flex items-center
                                                                justify-center">
                                                    <PackageSearchIcon
                                                        size={16}
                                                        className="text-slate-300"
                                                    />
                                                </div>
                                            )}
                                            <p className="font-medium
                                                          text-slate-700
                                                          line-clamp-1
                                                          max-w-xs">
                                                {product.name}
                                            </p>
                                        </div>
                                    </td>

                                    {/* Plataforma */}
                                    <td className="py-3 px-4">
                                        <span className="bg-slate-100
                                                         text-slate-600
                                                         text-xs font-medium
                                                         px-2 py-1 rounded-full">
                                            {product.platform || '—'}
                                        </span>
                                    </td>

                                    {/* Preço */}
                                    <td className="py-3 px-4 font-semibold
                                                   text-green-600">
                                        {product.price
                                            ? `R$ ${product.price.toFixed(2)}`
                                            : '—'}
                                    </td>

                                    {/* Status */}
                                    <td className="py-3 px-4">
                                        <button
                                            onClick={() =>
                                                toast.promise(
                                                    toggleActive(
                                                        product.id,
                                                        product.isActive
                                                    ),
                                                    { loading: "Atualizando..." }
                                                )
                                            }
                                            className="flex items-center gap-1.5
                                                       text-xs font-medium"
                                        >
                                            {product.isActive ? (
                                                <>
                                                    <ToggleRightIcon
                                                        size={22}
                                                        className="text-green-500"
                                                    />
                                                    <span className="text-green-600">
                                                        Ativo
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <ToggleLeftIcon
                                                        size={22}
                                                        className="text-slate-400"
                                                    />
                                                    <span className="text-slate-400">
                                                        Inativo
                                                    </span>
                                                </>
                                            )}
                                        </button>
                                    </td>

                                    {/* Ações */}
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="text-slate-400 hover:text-green-600
                                                            transition"
                                                title="Editar produto"
                                            >
                                                <PencilIcon size={16} />
                                            </Link>
                                            <a  href={product.affiliateUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-400
                                                            hover:text-slate-600
                                                            transition"
                                            >
                                                <ExternalLinkIcon size={16} />
                                            </a>
                                            <button
                                                onClick={() =>
                                                    deleteProduct(product.id)
                                                }
                                                className="text-red-400
                                                            hover:text-red-600
                                                            transition"
                                            >
                                                <Trash2Icon size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}