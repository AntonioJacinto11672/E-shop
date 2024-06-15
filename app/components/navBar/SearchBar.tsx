'use client'
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const SearchBar = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors }
    } = useForm<FieldValues>
            ({
                defaultValues: {
                    name: '',
                    description: '',
                    brand: '',
                    category: '',
                    inStock: '',
                    image: [],
                    price: ''

                }
            })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        toast("Não pode Pesquisar demomento")
        console.log(data)
        if(!data.searchTerm) return router.push('/')

            
    }
    return (
        <div className="flex items-center">
            <input {...register('searchTerm')}
                autoComplete="off" type="text" placeholder="Explore E-shop"
                className="p-2 border border-gray-300 rounded-l-md  focus:outline-none focus:border-[0.5px] focus:border-slate-500 w-80" />
            <button className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md"
                onClick={handleSubmit(onSubmit)}>
                Search
            </button>
        </div>
    );
}

export default SearchBar;