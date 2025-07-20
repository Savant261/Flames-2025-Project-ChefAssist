import React,{useEffect} from 'react'

const Trending = () => {
  useEffect(() => {
    document.title = 'Trending / ChefAssist';
  }, []);
  return (
    <div className='min-h-screen flex item-center justify-center flex-1'>Trending</div>
  )
}

export default Trending