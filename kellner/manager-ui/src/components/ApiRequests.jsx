
export async function getRestaurant(token) {
    const response = await fetch('http://localhost:5000/api/getRestaurant', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'authorization': `bearer ${token}`
        },
    })

    const data = await response.json();
    console.log(data.resataurant)
    if (response.status === 200){
        return data
    }

}