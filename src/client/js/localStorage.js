// Load data from local storage and update UI
export function checkLocalStorage(event) {
    if (localStorage.responseData) {
        const responseData = JSON.parse(localStorage.getItem('responseData'))
        Client.updateUI(responseData)
    }
}

// Clears data from local storage 
export function cleanLocalStorage(event) {
    localStorage.clear()
    location.reload()
}