import React,{useEffect} from 'react'
import Filter from "../components/explore/Filter.jsx"
const Search = () => {
   useEffect(() => {
      document.title = 'Search / ChefAssit';
    }, []);
  return (<>
    <Filter />
    <div className='min-h-screen flex item-center justify-center flex-1'>Search</div>
  </>
  )
}

export default Search