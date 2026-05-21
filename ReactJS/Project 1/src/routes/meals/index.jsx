import { createFileRoute, Link,useRouter } from '@tanstack/react-router'
import {fetchMeals} from '../../api/api.js'
import Loader from '../../../components/LoaderComponent.jsx'
import { useState } from 'react'

export const Route = createFileRoute('/meals/')({
  validateSearch:(search) => {
     return{
       page: search.page ? search.page : '1',
     }
   },
   component: RouteComponent,
   loaderDeps:({search:{page}}) => ({page}),
   loader: ({deps:{page}}) =>  fetchMeals(page),
    pendingComponent: () => <Loader />,
    errorComponent: ({ error }) => <div>Error: {error.message}</div>,
})  

function RouteComponent() {
    // const [isRefreshed,setIsRefreshed] = useState(false);
    const router  = useRouter();
   const { page } = Route.useSearch() // very important to use useSearch to get the current page number from the URL search parameters
   const {mealsData,data:meals} = Route.useLoaderData();


    function handleRefresh() { // this function , solves the problem , it saves the random page to the search param of /users , ie basically it rebavigate me to this page with a random page 
  let randomPage = Math.floor((Math.random() * 30) + 1);

  router.navigate({
    to: '/meals',
    search: {
      page: String(randomPage),
    },
  });
//   randomPage = null;
}
  

  console.log(meals);
  return <div>
    <ul style = {{display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center'}} >
      {meals.map((meal) =>(<Link key = {meal.id} to={`/meals/$mealId`} params = {{mealId: meal.id}}  search={{ page }} ><li style = {{display:'inline-block', margin:'auto'}} > <div>
        {meal.strMeal} <img style = {{display:'block', margin:'auto', width: '100px', height: '100px'}} src={meal.strMealThumb}  alt={meal.strMeal}/>
        </div> </li></Link>) )}
    </ul>
    <button onClick = {handleRefresh} >Refresh Meals</button>
    
  </div>
}
