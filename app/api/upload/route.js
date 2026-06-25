import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import s3 from "@/configs/s3"
import { randomUUID } from "crypto"

export async function POST(request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: "Não autorizado" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado" },
        { status: 400 }
      )
    }

    // Gera um nome único para evitar colisões no bucket
    const extension = file.name.split(".").pop()
    const uniqueName = `${randomUUID()}.${extension}`
    const s3Key = `products/${uniqueName}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Faz o upload para o S3
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: s3Key,
        Body: buffer,
        ContentType: file.type,
      })
    )

    // Monta a URL do ImageKit (não do S3 diretamente)
    const imagekitUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL}/${s3Key}`

    return NextResponse.json({ url: imagekitUrl })

  } catch (error) {
    console.error("[UPLOAD_ERROR]", error)
    return NextResponse.json(
      { error: "Erro interno no upload" },
      { status: 500 }
    )
  }
}