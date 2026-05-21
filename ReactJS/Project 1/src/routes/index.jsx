import { createFileRoute,Link } from '@tanstack/react-router'
import {fetchUsers,fetchMeals} from '../api/api.js'


export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader:async () => {
    return {
      RandomUsers: await fetchUsers(),
      RandomMeals: await fetchMeals(),
    }
  },
})

function RouteComponent() {
  const {RandomUsers,RandomMeals} = Route.useLoaderData();
   const {usersData,data:users} = RandomUsers;
   const {mealsData,data:meals} = RandomMeals;
  //  console.log(mealsData,meals);
   
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/users/" search={{ page: usersData.page}} ><button>View Users</button></Link>
      <Link to="/meals/" search={{ page: mealsData.page, preference: 'Any' }} ><button>View Meals</button></Link>
    </>
  )
}
