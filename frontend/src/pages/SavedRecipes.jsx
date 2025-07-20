import React,{useEffect} from 'react'

const SavedRecipes = () => {
   useEffect(() => {
      document.title = 'Saved Recipe / ChefAssist';
    }, []);
  return (
    <div  className='min-h-screen flex item-center justify-center flex-1'>SavedRecipes</div>
  )
}

export default SavedRecipes