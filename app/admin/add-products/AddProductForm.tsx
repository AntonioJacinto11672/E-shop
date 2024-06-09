import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import NullData from "@/app/components/NullData";

const AddProductForm = async () => {
    const currentUser = await getCurrentUser()
    console.log("Dados ", currentUser)
    
    if(!currentUser || currentUser.role === "ADMIN"){
        return <NullData title="Ooops!  Access dinied " />
    }

    return ( <div className="p-8">
        <Container>
        <FormWrap>
            <AddProductForm />
        </FormWrap>
        </Container>
    </div> );
}
 
export default AddProductForm;