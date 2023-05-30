import Heading from '@/components/ui/Heading'
import { Calendar, Book, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Product } from '@prisma/client'
import { db } from '@/lib/db'
import { getProductData } from '@/lib/getProductData'

export async function generateStaticParams() {
    const products = await db.product.findMany()
    return products.map((product: Product) => ({
        productId: product.id
    }))
}

export async function generateMetadata({ params }: {params : {productId: string}}){
    const products = await db.product.findMany()
    const { productId } = params
    const product = products.find(product => product.id === productId)
    if(!product){
        return{
            title: 'Product niet gevonden'
        }
    }
    return {
        title: product.name,
    }
}

export default async function Post({ params }: {params : {productId: string}}){
    const products = await db.product.findMany()
    const { productId } = params
    if(!products.find(product => product.id === productId)){
        return notFound()
    }

    const {name} = await getProductData(productId) as Product

    return(
        <article className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto mt-20 items-center">
            {name}
        </article>
    )
}