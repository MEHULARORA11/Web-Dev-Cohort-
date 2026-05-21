import { createFileRoute ,Link} from '@tanstack/react-router'
import {fetchUser} from '../../api/api.js'
import Loader from '../../../components/LoaderComponent.jsx'

export const Route = createFileRoute('/users/$userId')({
  validateSearch:(search) => {
     return{
       page: search.page ? search.page : '1',
     }
   },
   component: RouteComponent,
   loader: async ({ params }) => {
      //  throw new Error('There was an error fetching the user data. Please try again later.');
      const { userId } = params;
      
        const user = await fetchUser(userId);
          return user
      
    },
    pendingComponent:() => <Loader />,
    errorComponent: ({ error }) => <div>Error: {error.message}</div>,
})

function RouteComponent() {
    const user =  Route.useLoaderData(); // this will give u the user data that u fetched in the loader function and u can use it to display the user details in this component
    const {page} = Route.useSearch() // => important  // by this u can extract the page number from the search params and use it to navigate back to the correct page of users list 
    


function handleDate(date){
 const dateData = new Date(date);
 const [userDate, time] = dateData.toLocaleString().split(',');
  const [month, day, year] = userDate.split('/');
 
  return `Born On ${day}-${month}-${year} at ${time.trim()}`;
  
}
function handleRegister(date){
 const dateData = new Date(date);
 const [userDate, time] = dateData.toLocaleString().split(',');
  const [month, day, year] = userDate.split('/');
 
  return `Registered On ${day}-${month}-${year} at ${time.trim()}`;
  
}

 return <div>
    <ul>
      {<>
      
      <li > {Object.values(user.name).join(' ')} </li>
      <img src={user.picture.large}  alt={Object.values(user.name).join(' ')}/>      
      </>}
    </ul>
    <div>Email: {user.email}</div>
    <div>DOB: {handleDate(user.dob.date)}</div>
    <div>Current Age: {user.dob.age}</div>
    <div>Registered At: {handleRegister(user.registered.date)} At the age of : {user.registered.age} </div>
    <Link to={`/users/`}  search={{ page }} ><button>Back to Users</button></Link>
    
  </div>
}
