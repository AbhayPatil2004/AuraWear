import React from 'react'
// import SearchBar from './components/HomeSearchBar'
import HeroSection from './components/HomeHeroSection'
import CategoriesSection from './components/HomeCategorySection'
import StoreFilters from './components/FilterSection'

function page() {
  return (
    
    <div>
      {/* <SearchBar></SearchBar> */}
      <StoreFilters></StoreFilters>
      <HeroSection></HeroSection>
      <CategoriesSection></CategoriesSection>
    </div>
  )
}

export default page