
async function fetchUser(id) {
    const user = await fetch(`https://api.freeapi.app/api/v1/public/randomusers/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const {data} = await user.json();
    return data;
}

async function fetchUsers(page) {
    const randomPage = Math.floor((Math.random() * 50) + 1);
    const users = await fetch(page?`https://api.freeapi.app/api/v1/public/randomusers?limit=10&page=${page}`:`https://api.freeapi.app/api/v1/public/randomusers?limit=10&page=${randomPage}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const {data:usersData} = await users.json();
    const {data} = usersData;
    return {usersData,data};
}

export {fetchUser,fetchUsers}