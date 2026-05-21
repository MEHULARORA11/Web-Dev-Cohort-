
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

async function fetchMeals(page) {
    const randomPage = Math.floor((Math.random() * 30) + 1);
    const meals = await fetch(page?`https://api.freeapi.app/api/v1/public/meals?limit=10&page=${page}`:`https://api.freeapi.app/api/v1/public/meals?limit=10&page=${randomPage}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
      const {data:mealsData} = await meals.json();
    const {data} = mealsData;
    return {mealsData,data};
    
}

async function fetchMeal(id) {
    const meal = await fetch(`https://api.freeapi.app/api/v1/public/meals/${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const {data} = await meal.json();
    return data;
}
export {fetchUser,fetchUsers,fetchMeals,fetchMeal};