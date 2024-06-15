
import { products } from "@/utils/products";

interface IProductParams {
    category?: string | null;
    searchTerm?: string | null
}

const getProducts = (params: IProductParams) => {
    try {
        const { category, searchTerm } = params

        let searchString = searchTerm

        if (!searchTerm) {
            searchString = ''
        }

        const searcRegx = new RegExp(`^${searchString}`, 'i')
        

        return products.filter(item => searcRegx.test(item.name))

        
    } catch (error: any) {
        throw new Error(error)
    }

}

export default getProducts;