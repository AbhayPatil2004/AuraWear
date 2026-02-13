import React from 'react'
import SellerStores from './components/SellerStores'
import SellerHeader from './components/SellerStoreHeader'

function page() {
  return (
    <div>
        <SellerHeader></SellerHeader>    
        <SellerStores></SellerStores>
    </div>
  )
}

export default page