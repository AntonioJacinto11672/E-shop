import { products } from '@/utils/products';
import prisma from '@/libs/prismadb'

export interface IProductParams {
    category?: string | null
    searchTerm?: string | null
}


export default async function getUsers(params: IProductParams) {
    try {
        const { category, searchTerm } = params
        let searchString = searchTerm
        if (!searchTerm) {
            searchString = ''
        }

        let query: any = {}
        const products: any | null = "Double"
       /*  const products = await prisma.user.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contain: searchString,
                            mode: 'insensitive'
                        },
                        email: {
                            contain: searchString,
                            mode: 'insensitive'
                        }
                    }
                ],
                orderby: {
                    createdDate: 'desc'
                }
            }
        }) */
        return products
    } catch (error: any) {
        throw new Error(error)
    }
}