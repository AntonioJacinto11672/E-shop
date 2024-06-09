import Container from "../Container";
import FormWrap from "../FormWrap";
import CheckoutClient from "./CheckoutClient";

const Checkout = () => {
    return (
        <Container>
            <FormWrap>
                <CheckoutClient/>
            </FormWrap>
        </Container>
    );
}

export default Checkout;