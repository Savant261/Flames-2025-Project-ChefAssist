import React from 'react'
import { useNavigate } from 'react-router-dom';
const Profile = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex flex-col bg-[#FFDAB9]">
            <div>Profile</div>
            <div onClick={()=> navigate("/editProfile")} >edit profile</div>
        </div>
    )
}

export default Profile