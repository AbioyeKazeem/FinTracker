import React, { useState, useEffect } from "react";
import UserProfile from "./UserProfile";
import ChangePassword from "./ChangePassword";
import AccountSettings from "./AccountSettings";
import DeleteAccount from "./DeleteAccount"

function ProfilePage({ updateUser, changePassword, userSettings, updateSettings, deleteAccount }) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
        console.log(storedUser);
    }, []);

    const saveUserToLocalStorage = (updatedUser) => {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser); // Update the state in the component
    };

    return (
        <div className="container mt-4">
            <h2>User Profile</h2>
            
            {/* UserProfile component handles updating the user's name and email */}
            <UserProfile user={user} updateUser={saveUserToLocalStorage} />

            {/* Other profile-related settings */}
            <ChangePassword changePassword={changePassword} />
            <AccountSettings userSettings={userSettings} updateSettings={updateSettings} />
            <DeleteAccount deleteAccount={deleteAccount} />
        </div>
    );
};


export default ProfilePage;
