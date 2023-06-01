"use client"
import { ShoppingCart } from "lucide-react";
import { useTransition } from "react";

interface AddToCartButtonProps {
    productId: string;
    addToCart: (productId: string) => Promise<void>;
}

export default function AddToCartButton({ productId, addToCart }: AddToCartButtonProps) {
    const [pending, startTransition] = useTransition();

    const handleAddToCart = async () => {
        startTransition(async () => {
            await addToCart(productId);
        });
    };

    return (
        <button
            disabled={pending}
            onClick={handleAddToCart}
            className="bg-blue-500 text-white w-[140px] py-2 flex rounded-sm gap-2">
            <ShoppingCart className="ml-3 my-auto" size={20} />Toevoegen
        </button>
    );
}
