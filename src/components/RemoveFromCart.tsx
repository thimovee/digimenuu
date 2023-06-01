"use client"
import { Trash } from "lucide-react";
import { useTransition } from "react";

interface RemoveFromCartButtonProps {
    productId: string;
    removeFromCart: (productId: string) => Promise<void>;
}

export default function RemoveFromCartButton({ productId, removeFromCart }: RemoveFromCartButtonProps) {
    const [pending, startTransition] = useTransition();

    const handleRemoveFromCart = async () => {
        startTransition(async () => {
            await removeFromCart(productId);
        });
    };

    return (
        <button
            disabled={pending}
            onClick={handleRemoveFromCart}
            className="bg-red-500 text-white p-2 flex rounded-md shadow-md hover:bg-red-600 transition-all"
        >
            <Trash className="m-auto" size={20} />
        </button>
    );
}
