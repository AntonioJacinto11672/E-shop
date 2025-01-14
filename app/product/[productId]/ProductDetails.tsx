'use client'

import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"; /* Gambiarra porque não aceita o use cliente */
import { MdCheckCircle } from "react-icons/md";

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
    const { handleAddProductToCart, cartProducts } = useCart()
    const [isProductInCart, setIsProductInCart] = useState(false)
    
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
        const router = useRouter()

    console.log(cartProducts)

    useEffect(() => {
        setIsProductInCart(false)
        if (cartProducts) {
            const exintingIndex = cartProducts.findIndex((item) => item.id === product.id)
            if (exintingIndex > -1) {
                setIsProductInCart(true)
            }
        }


    }, [cartProducts])

    const ProductRating = product.reviews.reduce((acc: number,
        item: any) => item.rating + acc, 0) / product.reviews.length


    const handleColorSelect = useCallback((value: SelectedImageType) => {
        setCartProduct((prev) => {
            return { ...prev, selectedImg: value }
        })
    }, [cartProduct.selectedImg])


    const handleQtyIncrease = useCallback(() => {
        if (cartProduct.quantity === 99) {
            return;
        }

        setCartProduct((prev) => {
            return { ...prev, quantity: ++prev.quantity }
        })
    }, [cartProduct]);

    const handleQtyDecrease = useCallback(() => {

        if (cartProduct.quantity === 1) {
            return;
        }

        setCartProduct((prev) => {

            return { ...prev, quantity: --prev.quantity }
        })
    }, [cartProduct]);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect} />
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

                {isProductInCart ? <>
                <p className="mb-2 text-slate-500 flex items-center gap-1 ">
                    <MdCheckCircle className="text-teal-400" size={20}/>
                    Product added to cart
                </p>
                <div className="max-w-[300px]">
                    <Button label="View Cart " onClick={() => {router.push("/cart")}}/>
                </div>
                </> :
                 <>
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
                    <div className="max-w-[300px]">
                        <Button

                            label="Add To Cart"
                            onClick={() => handleAddProductToCart(cartProduct)}
                        />
                    </div>
                </>}
            </div>
        </div>);
}

export default ProductDetails;