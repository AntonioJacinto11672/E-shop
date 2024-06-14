import getCurrentUser from "@/actions/getCurrentUser";
import getUsers from "@/actions/getUsers";
import Container from "@/app/components/Container";
import NullData from "@/app/components/NullData";

const ManageProducts = async () => {
    const currentUser = await getCurrentUser()
    const products = await getUsers({category: null})
   

    
    if(!currentUser || currentUser.role !== "ADMIN"){
        return <NullData title="Ooops!  Access dinied " />
    }
    return (
        <div className="pt-8">
            <Container>
                <ManageProducts />
            </Container>
        </div>
    );
}

export default ManageProducts;