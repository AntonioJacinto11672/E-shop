'use client'

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CheckoutForm from "./CheckoutForm";

const CheckoutClient = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
    const [loanding, setLoanding] = useState(false)
    const [error, setError] = useState(false)

    const router = useRouter()
    useEffect(() => {
        //Create a paymentintent as soon as the page loads
        if (cartProducts) {
            setLoanding(true)
            setError(false)

            fetch('/api/create-paymentIntet', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent
                })
            }).then((res) => {
                setLoanding(false)
                if (res.status == 401) {
                    return router.push("/login")
                }
                return res.json()

            })

        }
    })
    return <CheckoutForm />
}

export default CheckoutClient;