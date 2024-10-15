export function changePassword(currentPassword, newPassword) {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && storedUser.password === currentPassword) {
        storedUser.password = newPassword; 
        localStorage.setItem('user', JSON.stringify(storedUser)); 
        alert("Password changed successfully.");
    } else {
        alert("Current password is incorrect.");
    }
    console.log(storedUser)
}
