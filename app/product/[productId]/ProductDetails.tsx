'use client'

import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { Rating } from "@mui/material";
import { useCallback, useState } from "react"; /* Gambiarra porque não aceita o use cliente */

interface ProductDetailsProps {
    product: any
}
export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: SelectedImageType,
    quantity: number,
    price: number
};

export type SelectedImageType = {
    color: string,
    colorCode: string,
    image: string,
};



const Horizontal = () => <hr className="w-[30%]  my-2" />

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const [cartProduct, setCartProduct] =
        useState<CartProductType>({
            id: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            brand: product.brand,
            selectedImg: { ...product.images[0] },
            quantity: 1,
            price: product.price
        })

    console.log(cartProduct)

    const ProductRating = product.reviews.reduce((acc: number,
        item: any) => item.rating + acc, 0) / product.reviews.length

    const handleQtyIncrease = useCallback(() => {
        setCartProduct((prev) => {
            return { ...prev, quantity: prev.quantity }
        });

    }, [])

    const handleQtyDecrease = useCallback(() => {
        setCartProduct((prev) => {
            return { ...prev, --quantity: prev.quantity }
        });

    }, [cartProduct])

    const handleColorSelect = useCallback((value: SelectedImageType) => {
        setCartProduct((prev) => {
            return { ...prev, selectedImg: value }
        })
    }, [cartProduct.selectedImg])
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>Imagem</div>
            <div>
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div>
                    <Rating value={ProductRating} readOnly />
                    <div> {product.reviews.length}  reviews</div>
                </div>
                <Horizontal />
                <div className="text-justify"> {product.description} </div>
                <Horizontal />
                <div>
                    <span className="font-semibold">CATEGORY:</span> {product.category}
                </div>
                <div>
                    <span className="font-semibold">Brand:</span> {product.brand}
                </div>
                <div className={product.inStock ? 'text-teal-400' : 'text-rose-400'}> {product.inStock ? 'In Stock' : 'Out Stock'}</div>
                <Horizontal />

                <SetColor
                    cartProduct={cartProduct}
                    images={product.images}
                    handleColorSelect={handleColorSelect}
                />
                <Horizontal />
                <SetQuantity
                    cartProduct={cartProduct}
                    handleQtyDecrease={handleQtyDecrease}
                    handleQtyIncrease={handleQtyIncrease}
                />
                <Horizontal />
                <div>add to Cart</div>
            </div>
        </div>);
}

export default ProductDetails;