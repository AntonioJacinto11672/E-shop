'use client'

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";


const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
            setIsLoading(true)
            console.log(data)

        console.log("Clicou")
    } 

    return (
        <>
            <Heading title="Sun in to E-Shop" />
            <Button outline  label="Continue with Google" icon={AiOutlineGoogle} onClick={() => {}} />
            <hr className="bg-slate-300 w-full h-px" />
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
            <Button label={isLoading ? "Loading" : "Sign Up"} onClick={handleSubmit(onSubmit)}/>
            <p>Do not have an acount? <Link className="text-sm" href={"/register"}>Sign up</Link></p>
        </>);
}

export default LoginForm;