'use client'

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

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

    const router = useRouter()

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        console.log(data)


        console.log("Clicou")

        axios.post("/api/register", data)
            .then(() => {
                toast.success('Account created')

                signIn("credentials", {
                    email: data.email,
                    password: data.password,
                    redirect: false,
                }).then((callback) => {
                    

                    if (callback?.ok) {
                        

                        router.push("/cart")
                        router.refresh()
                        toast.success('Logged in')
                    }



                    if (callback?.error) {
                        /* console.log("Não entrou Saiu por isso ****************************")
                        console.log(callback.error) */

                        toast.error(callback.error)
                    }
                })
            })
            .catch(() => console.log("Saiu por isso 2 ****************************"))
            .finally(()=> setIsLoading(false))
    }

    return (
        <>
            <Heading title="Sun up for E-Shop" />
            <Button outline label="Sign up with Google" icon={AiOutlineGoogle} onClick={() => { }} />
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
            <Button label={isLoading ? "Loading" : "Sign Up"} onClick={handleSubmit(onSubmit)} />
            <p>Already have an acount? <Link className="text-sm" href={"/login"}>Log in</Link></p>
        </>);
}

export default RegisterForm;