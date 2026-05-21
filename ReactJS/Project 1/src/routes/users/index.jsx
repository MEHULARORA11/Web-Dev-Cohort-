import { createFileRoute, Link,useRouter } from '@tanstack/react-router'
import {fetchUsers} from '../../api/api.js'
import Loader from '../../../components/LoaderComponent.jsx'
import { useState } from 'react'

export const Route = createFileRoute('/users/')({
  validateSearch:(search) => {
     return{
       page: search.page ? search.page : '1',
     }
   },
   component: RouteComponent,
   loaderDeps:({search:{page}}) => ({page}),
   loader: ({deps:{page}}) =>  fetchUsers(page),
    pendingComponent: () => <Loader />,
    errorComponent: ({ error }) => <div>Error: {error.message}</div>,
})  

function RouteComponent() {
    // const [isRefreshed,setIsRefreshed] = useState(false);
    const router  = useRouter();
   const { page } = Route.useSearch() // very important to use useSearch to get the current page number from the URL search parameters
   const {usersData,data:users} = Route.useLoaderData();


    function handleRefresh() { // this function , solves the problem , it saves the random page to the search param of /users , ie basically it rebavigate me to this page with a random page 
  const randomPage = Math.floor((Math.random() * 50) + 1);

  router.navigate({
    to: '/users',
    search: {
      page: String(randomPage),
    },
  });
}
  

  console.log(users);
  return <div>
    <ul>
      {users.map((user) =>(<Link key = {user.id} to={`/users/$userId`} params = {{userId: user.id}}  search={{ page }} ><li > {Object.values(user.name).join(' ')} </li><img src={user.picture.large}  alt={Object.values(user.name).join(' ')}/></Link>) )}
    </ul>
    <button onClick = {handleRefresh} >Refresh Users</button>
    
  </div>
}
