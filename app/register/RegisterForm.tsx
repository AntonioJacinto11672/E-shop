'use client'

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";


const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        /* setIsLoading(true)
        console.log(data) */

        console.log("Clicou")
    } 

    return (
        <>
            <Heading title="Sun up for E-Shop" />
            <hr className="bg-slate-300 w-full h-px" />
            <Input
                id="name"
                label="name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button label={isLoading ? "Loading" : "Sign Up"} onClick={() => {handleSubmit(onSubmit)}}/>
        </>);
}

export default RegisterForm;