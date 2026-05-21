import { createFileRoute,Link } from '@tanstack/react-router'
import {fetchUsers} from '../api/api.js'


export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader:() => fetchUsers(),
})

function RouteComponent() {
   const {usersData,data:users} = Route.useLoaderData();
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/users/" search={{ page: usersData.page }} ><button>View Users</button></Link>
    </>
  )
}
