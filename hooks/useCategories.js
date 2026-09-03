'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'

// Cache em memória do módulo — sobrevive entre componentes,
// mas reseta se a página for recarregada (F5)
let cachedCategories = null
let inFlightRequest = null

export function useCategories() {
    const [categories, setCategories] = useState(cachedCategories || [])
    const [loading, setLoading] = useState(!cachedCategories)

    useEffect(() => {
        // Se já tem cache, usa direto — sem nova chamada
        if (cachedCategories) {
            setCategories(cachedCategories)
            setLoading(false)
            return
        }

        // Se já existe uma busca em andamento (outro componente pediu primeiro),
        // reaproveita a mesma Promise em vez de disparar outra chamada
        if (!inFlightRequest) {
            inFlightRequest = axios.get('/api/categories')
                .then((response) => {
                    const data = response.data.data || []
                    cachedCategories = data
                    return data
                })
                .finally(() => {
                    inFlightRequest = null
                })
        }

        inFlightRequest
            .then((data) => setCategories(data))
            .catch((error) => {
                console.error('Erro ao carregar categorias:', error)
                setCategories([])
            })
            .finally(() => setLoading(false))
    }, [])

    return { categories, loading }
}