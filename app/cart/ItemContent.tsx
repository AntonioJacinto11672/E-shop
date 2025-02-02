'use client'
import Link from "next/link";
import { FormatPrice } from "../components/products/FormPrice";
import { CartProductType } from "../product/[productId]/ProductDetails";
import Image from "next/image";
import { truncateText } from "@/utils/TruncateText";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
interface ItemContentProps {
    item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
    const {handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease, handleClearCart} = useCart()
    return (
        <div className="grid grid-cols-5 text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
            <div className="col-span-2 justify-self-start  flex gap-2 md:gap-4">
                <Link href={`/product/${item.id}`}>
                    <div className="relative w-[70px] aspect-square">
                        <Image 
                        src={item.selectedImg.image}
                        alt={item.name}
                        fill
                        className="object-contain"
                        />
                    </div>
                </Link>
                <div className="flex flex-col justify-between ">
                    <Link href={`/product/${item.id}`}>
                        {truncateText(item.name)}
                    </Link>
                    <div>{item.selectedImg.color}</div>
                    <div className="w-[70px]">
                        <button className="text-slate-500 underline" onClick={() => handleRemoveProductFromCart(item)}>
                            Remover
                        </button>
                    </div>
                </div>
            </div>
            <div className="justify-self-center">{FormatPrice(item.price)}</div>
            <div className="justify-self-center ">
                <SetQuantity 
                cartCounter={true}
                cartProduct={item}
                handleQtyIncrease={() => handleCartQtyIncrease(item)}
                handleQtyDecrease={() => handleCartQtyDecrease(item)}
                />
            </div>
            <div className="justify-self-end font-semibold ">
                {FormatPrice(item.price * item.quantity)}
            </div>
        </div>
    );
}

export default ItemContent;