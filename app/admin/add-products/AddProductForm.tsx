'use client'
import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/inputs/CategoryInput";
import CustomCheckbox from "@/app/inputs/CustomCheckbox";
import Input from "@/app/inputs/Input";
import SelectColor from "@/app/inputs/SelectColor";
import TextArea from "@/app/inputs/TextArea";
import { categories } from "@/utils/categories";
import { colors } from "@/utils/Colors";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";


export type ImageType = {
    color: string;
    colorCode: string;
    image: File | null
}

export type UploadImageType = {
    color: string;
    colorCode: string;
    image: string
}


const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState<ImageType[] | null>(null)
    const [isProductCreated, setIsProductCreated] = useState(false)
   
  
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

            useEffect(() => {
                if (isProductCreated) {
                    reset();
                    setImages(null)
                    setIsProductCreated(false)
                }
            }, [isProductCreated])


            const onSubmit: SubmitHandler<FieldValues> = async (data) => {
                setIsLoading(true)
                
                console.log("Product data", data)
                //vareble for uploaded
                let UploadImage: UploadImageType[] = []
                //
                if (!data.category) {
                    setIsLoading(false)
                    return toast.error("Category is not selected")
                }

                if(!data.images || data.images.length === 0) {
                    setIsLoading(false)
                    return toast.error("No Selected image")
                }

                const handleImageUploads = async () => {
                    toast("Creating product, please wait...")
                    try {
                        for(const item of data.images) {
                            const fileName = new Date().getTime() + '-' + item.image.name
                            const storage = "por onde vai armazenar hire"
                        }
                    } catch (error) {
                        
                    }
                }
            }   
    const category = watch("category")

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const addImageToState = useCallback((value: ImageType) => {
        setImages((prev) => {
            if (!prev) {
                return [value];
            }
            return [...prev, value]
        })
    }, [])

    const removeImageFromState = useCallback((value: ImageType) => {
        setImages(
            (prev) => {
            if (prev) {
                const filterImage = prev.filter(
                    (item) => item.color === value.color
                );
                return filterImage
            }
            return prev
        })
    }, [])
    
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
        <div className="w-full flex flex-col flex-wrap gap-4 ">
            <div>
                <div className="font-bold">
                    Select the avaliable product color and upload their images.
                </div>
                <div className="text-sm">
                    Your must upload an image for each for the color selected atherwise
                    your color selection will be ignore
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {colors.map((item, index) => {
                    return <SelectColor key={index} item={item} addImageToState={addImageToState}
                        removeImageFromState={removeImageFromState} isProductCreated={isProductCreated} />
                })}
            </div>
        </div>
                <Button label={isLoading? 'Loanding...' : 'Add Product'} onClick={handleSubmit(onSubmit)}/>
    </>);
}

export default AddProductForm;