'use client'
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import axios from "axios"
import toast from "react-hot-toast"
import Loading from "@/components/Loading"
import { UploadIcon, XIcon, PackageSearchIcon } from "lucide-react"

const MAX_IMAGES = 5

export default function EditProductPage() {
  const { id } = useParams()
  const router = useRouter()

  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [uploading, setUploading] = useState(null) // índice do slot subindo

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    images: [],
  })

  // Buscar produto atual
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`)
        setForm({
          name: data.name || "",
          description: data.description || "",
          price: data.price || "",
          discount: data.discount || "",
          images: data.images || [],
        })
      } catch {
        toast.error("Erro ao carregar produto")
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Upload de uma imagem em um slot específico
  const handleImageUpload = async (e, slotIndex) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(slotIndex)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const { data } = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      setForm((prev) => {
        const newImages = [...prev.images]
        newImages[slotIndex] = data.url
        return { ...prev, images: newImages }
      })

      toast.success("Imagem enviada")
    } catch {
      toast.error("Erro ao enviar imagem")
    } finally {
      setUploading(null)
    }
  }

  // Remover imagem de um slot
  const handleRemoveImage = (slotIndex) => {
    setForm((prev) => {
      const newImages = prev.images.filter((_, i) => i !== slotIndex)
      return { ...prev, images: newImages }
    })
  }

  // Salvar todas as alterações
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)

    try {
      await axios.patch(`/api/products/${id}`, {
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        discount: form.discount ? parseInt(form.discount) : null,
        images: form.images.filter(Boolean), // remove vazios
      })

      toast.success("Produto atualizado com sucesso")
      router.push("/admin/products")

    } catch {
      toast.error("Erro ao salvar produto")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loading />

  // Monta 5 slots fixos (preenchidos ou vazios)
  const slots = Array.from({ length: MAX_IMAGES }).map(
    (_, i) => form.images[i] || null
  )

  return (
    <div className="text-slate-500 mb-20 max-w-3xl">
      <h1 className="text-2xl mb-8">
        Editar <span className="text-slate-800 font-medium">Produto</span>
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">

        {/* Galeria de upload — 5 slots */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-3 block">
            Imagens do produto (até {MAX_IMAGES})
          </label>
          <div className="flex gap-3 flex-wrap">
            {slots.map((imageUrl, index) => (
              <div
                key={index}
                className="relative w-24 h-24 rounded-2xl border-2
                          border-dashed border-slate-200 overflow-hidden
                          bg-slate-50 flex items-center justify-center
                          group"
              >
                {uploading === index ? (
                  <div className="w-5 h-5 border-2 border-slate-300
                                  border-t-green-500 rounded-full
                                  animate-spin" />
                ) : imageUrl ? (
                  <>
                    <Image
                      src={imageUrl}
                      alt={`Imagem ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-white/90
                                 rounded-full p-1 shadow-sm
                                 opacity-0 group-hover:opacity-100
                                 transition-opacity"
                    >
                      <XIcon size={12} className="text-red-500" />
                    </button>
                    {index === 0 && (
                      <span className="absolute bottom-1 left-1
                                       bg-green-500 text-white
                                       text-[8px] font-bold px-1.5
                                       py-0.5 rounded-full">
                        Principal
                      </span>
                    )}
                  </>
                ) : (
                  <label className="flex flex-col items-center
                                    justify-center w-full h-full
                                    cursor-pointer">
                    <UploadIcon size={18} className="text-slate-300" />
                    <span className="text-[9px] text-slate-400 mt-1">
                      Slot {index + 1}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, index)}
                    />
                  </label>
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            A primeira imagem é usada como capa do produto.
          </p>
        </div>

        {/* Nome */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Nome do produto
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-slate-200 rounded-xl
                      outline-slate-400 text-sm"
          />
        </div>

        {/* Descrição */}
        <div>
          <label className="text-sm font-medium text-slate-700 mb-2 block">
            Descrição
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-slate-200 rounded-xl
                      outline-slate-400 text-sm resize-none"
          />
        </div>

        {/* Preço e Desconto */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Preço (R$)
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full p-3 border border-slate-200 rounded-xl
                        outline-slate-400 text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Desconto (%)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              name="discount"
              value={form.discount}
              onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl
                        outline-slate-400 text-sm"
            />
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 mt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-slate-800 text-white text-sm font-bold
                      py-3 px-10 rounded-xl hover:bg-slate-900
                      active:scale-95 transition-all disabled:opacity-50"
          >
            {saving ? "Salvando..." : "Salvar Alterações"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="text-slate-500 text-sm font-medium py-3 px-6
                      rounded-xl hover:bg-slate-50 transition-all"
          >
            Cancelar
          </button>
        </div>

      </form>
    </div>
  )
}