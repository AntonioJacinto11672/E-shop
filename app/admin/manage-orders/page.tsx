import getCurrentUser from "@/actions/getCurrentUser";
import Container from "@/app/components/Container";
import ManageOrderssClient from "./ManageOrderssClient";
import getProducts from "@/actions/getProdutus";
import getUsers from "@/actions/getUsers";


const ManageOrders = async () => {
    
    /* const currentUser = await getCurrentUser()
   

    console.log("Current user",currentUser?.role)
    
    if(!currentUser || currentUser.role !== "ADMIN"){
        return <NullData title="Ooops!  Access dinied " />
    } */

   const products = await getProducts({category: null});
   const getUser = await getUsers({category: null})

   console.log("products filter >>>> ", products)
    return (
        <div className="pt-8">
            <Container>
                <ManageOrderssClient products={products}/>
            </Container>
        </div>
    );
}

export default ManageOrders;