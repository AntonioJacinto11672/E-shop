'use client'

import { Rating } from "@mui/material";

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



const Horizontal = ()  =>  <hr className="w-[30%]  my-2"/>

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    
    const ProductRating = product[0].reviews.reduce((acc: number, 
        item: any ) =>  item.rating + acc, 0)  / product[0].reviews.length  

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>Imagem</div>
        <div>
            <h2 className="text-3xl font-medium text-slate-700">{product[0].name}</h2>
            <div>
                <Rating value={ProductRating}  readOnly/>
                <div> {product[0].reviews.length}  reviews</div>
            </div>
            <Horizontal />
            <div className="text-justify"> {product[0].description} </div>
            <Horizontal />
            <div>
                <span className="font-semibold">CATEGORY:</span> {product[0].category}
            </div>
            <div>
                <span className="font-semibold">Brand:</span> {product[0].brand }
            </div>
            <div className={product[0].inStock ? 'text-teal-400' : 'text-rose-400'}> { product[0].inStock ? 'In Stock' : 'Out Stock'}</div>
            <Horizontal />
            <div>Color</div>
            <Horizontal />
            <div>Quality</div>
            <Horizontal />
            <div>add to Cart</div>
        </div>
    </div>);
}

export default ProductDetails;