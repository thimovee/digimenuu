import Heading from '@/components/ui/Heading'
import { Calendar, Book, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Product } from '@prisma/client'
import { db } from '@/lib/db'
import { getProductData } from '@/lib/getProductData'
import Paragraph from '@/components/ui/Paragraph'
import AddToCartButton from '@/components/AddToCart'
import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function generateStaticParams() {
    const products = await db.product.findMany()
    return products.map((product: Product) => ({
        productId: product.id
    }))
}

export async function generateMetadata({ params }: { params: { productId: string } }) {
    const products = await db.product.findMany()
    const { productId } = params
    const product = products.find(product => product.id === productId)
    if (!product) {
        return {
            title: 'Product niet gevonden'
        }
    }
    return {
        title: product.name,
    }
}

export default async function Post({ params }: { params: { productId: string } }) {
    const products = await db.product.findMany()
    const { productId } = params
    if (!products.find(product => product.id === productId)) {
        return notFound()
    }

    const { id, name, image, description, price, discount } = await getProductData(productId) as Product
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id
    const addToCart = async (productId: string) => {
        "use server"
        if (userId) {
            await db.shoppingCart.upsert({
                where: {
                    userId: userId,
                },
                create: {
                    userId: userId,
                    products: {
                        connect: {
                            id: productId,
                        },
                    },
                },
                update: {
                    products: {
                        connect: {
                            id: productId,
                        },
                    },
                },
            });
            revalidatePath("/");
        }
    };
    return (
        <div className="w-3/4 min-h-screen mx-auto my-20 flex gap-32">
            <div>
                <Image className="max-h-[466px] max-w-[700px] object-cover" src={image!} alt={name} width={700} height={700} />
                <div className="w-[700px] flex justify-between mt-4">
                    <div className="w-[100px] h-[100px] border border-slate-300" />
                    <div className="w-[100px] h-[100px] border border-slate-300" />
                    <div className="w-[100px] h-[100px] border border-slate-300" />
                    <div className="w-[100px] h-[100px] border border-slate-300" />
                    <div className="w-[100px] h-[100px] border border-slate-300" />
                    <div className="w-[100px] h-[100px] border border-slate-300" />
                </div>
            </div>
            <div>
                <Heading size="xs">{name}</Heading>
                <Paragraph className="my-8">{description}</Paragraph>
                <Heading size="sm" className="mt-8">€{price}</Heading>
                {discount! > 0 && <div className="bg-red-500 max-w-fit px-4 py-2 my-8 rounded-full font-semibold text-white text-sm">Nu {discount}% korting</div>}
                <div className="px-8 bg-blue-500 max-w-fit rounded-md"><AddToCartButton productId={id} addToCart={addToCart} /></div>
            </div>
        </div>
    )
}