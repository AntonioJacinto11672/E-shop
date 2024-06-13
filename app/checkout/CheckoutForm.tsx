import Heading from "../components/Heading";

const CheckoutForm = () => {


    const onSubmit = async () => {
        console.log("OnSubmit")
    }
    return ( 
        <form onSubmit={onSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Enter your details to complete checkout" /> 
            </div>
            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            
        </form>
     );
}
 
export default CheckoutForm;