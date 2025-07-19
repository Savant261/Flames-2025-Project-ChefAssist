import React,{useEffect} from 'react'

const MyFeed = () => {
  useEffect(() => {
    document.title = 'MyFeed / ChefAssit';
  }, []);
  return (
    <div className='min-h-screen flex item-center justify-center flex-1'>MyFeed</div>
  )
}

export default MyFeed