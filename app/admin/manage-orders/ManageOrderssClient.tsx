'use client'
import ActionBtn from "@/app/components/ActionBtn";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { FormatPrice } from "@/app/components/products/FormPrice";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";


interface ManageOrderssClientClientProps {
    products?: any[]
}
const ManageOrderssClientClient: React.FC<ManageOrderssClientClientProps> = ({ products }) => {
    const router = useRouter()
    let rows: any = []
    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: FormatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images
            }
        })
    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 220 },
        { field: 'name', headerName: 'Name', width: 220 },
        {
            field: 'price', headerName: 'Price (USD)', width: 100,
            renderCell: (params) => {
                return (
                    <div className="font-bold text-slate-800"> {params.row.price} </div>
                )
            }
        },
        { field: 'category', headerName: 'category', width: 100 },
        { field: 'brand', headerName: 'brand', width: 100 },
        {
            field: 'inStock', headerName: 'inStock', width: 120,
            renderCell: (params) => {
                return (
                    <div className="">
                        {
                            params.row.inStock === true ?
                                (<Status text="in stock" icon={MdDone} bg="bg-teal-200" color="text-teal-700" />)
                                :
                                (<Status text="out stock" icon={MdClose} bg="bg-rose-200" color="text-rose-700" />)
                        }
                    </div>
                )
            }
        },
        {
            field: 'action', headerName: 'Actions', width: 200,
            renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-1 w-full">
                        <ActionBtn icon={MdCached} onClick={() => { handleTOggleStock(params.row.id, params.row.inStock) }} />
                        <ActionBtn icon={MdDelete} onClick={() => { handleDelete(params.row.id, params.row.images) }} />
                        <ActionBtn icon={MdRemoveRedEye} onClick={() => { router.push(`product/${params.row.id}`)}} />
                    </div>
                )
            }
        },
    ]

    const handleTOggleStock = useCallback((id: string, inStock: boolean) => {
        //update On Stock up ou down
        console.log("Going update InStock", id, inStock)
        toast.success("Loading....")

        
    }, [])

    const handleDelete = useCallback((id: string, images: any[]) => {
        
        toast("Delete Product Please Waint")


        
    }, [])

    const handleTOggleEditAll = useCallback((id: string, inStock: boolean) => {
        //update On Stock up ou down
        console.log("Going update InStock", id, inStock)
        toast("Delete Product Please Waint")

        
    }, [])


    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Manage Product" center />
            </div>
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>);
}

export default ManageOrderssClientClient;