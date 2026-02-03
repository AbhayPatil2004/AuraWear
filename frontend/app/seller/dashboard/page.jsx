import SellerHeader from "../components/SellerHeader"
import SellerStats from "../components/SellerStats"
// import SellerStores from '../components/OwnerStores'
// import OwnerStoresPage from "../components/SellerStores"
import SellerStores from "../components/SellerStores"

function Page() {

    return (
        <div>
            <SellerHeader></SellerHeader>
            <SellerStats></SellerStats>
            {/* <OwnerStoresPage></OwnerStoresPage> */}
            <SellerStores></SellerStores>
        </div>
    )
}

export default Page