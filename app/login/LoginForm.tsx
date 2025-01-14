'use client'

import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { safeUser } from "@/types";


interface LoginFormProps {
    currentUser: safeUser | null
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
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

    const router = useRouter()

    useEffect(() => {
        if (currentUser) {
            router.push("/cart")
            router.refresh()
        }
    }, [])
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true)
        console.log(data)
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
            setIsLoading(true)
            if (callback?.ok) {
                router.push("/cart")
                router.refresh()
                toast.success('Logged in')
            }
            if (callback?.error) {
                toast.error(callback.error)
            }
        })/* .catch(() => toast.error("Something went wrong"))
            .finally(() => { setIsLoading(false) }) */
    }
    if (currentUser) {
        return <p className="text.center">Logged in Redirecting...</p>
    }

    return (
        <>
            <Heading title="Sun in to E-Shop" />
            <Button outline label="Continue with Google" icon={AiOutlineGoogle} onClick={() => { }} />
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
            <Button label={isLoading ? "Loading" : "Sign Up"} onClick={handleSubmit(onSubmit)} />
            <p>Do not have an acount? <Link className="text-sm" href={"/register"}>Sign up</Link></p>
        </>);
}

export default LoginForm;