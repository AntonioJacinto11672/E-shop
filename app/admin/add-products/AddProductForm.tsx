'use client'
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/inputs/CategoryInput";
import CustomCheckbox from "@/app/inputs/CustomCheckbox";
import Input from "@/app/inputs/Input";
import TextArea from "@/app/inputs/TextArea";
import { categories } from "@/utils/categories";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";


const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false)
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

    const category = watch("category")
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }
    return (<>
        <Heading title="Add a Product" center />
        <Input
            id="name"
            label="Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input
            id="price"
            label="price"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <Input
            id="brand"
            label="brand"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />

        <TextArea
            id="description"
            label="description"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
        />
        <CustomCheckbox id="InStock" label="This product is in stock " register={register} />
        <div className="w-full font-medium">
            <div className="mb-2 font-semibold">Select a category</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">

                {categories.map((item) => {
                    if (item.label === "All") {
                        return null
                    }


                    return (
                        <div key={item.label} className="col-span">
                            <CategoryInput
                                onClick={(category) => setCustomValue('category', category)}
                                selected={category === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>)
                })}
            </div>
        </div>
    </>);
}

export default AddProductForm;