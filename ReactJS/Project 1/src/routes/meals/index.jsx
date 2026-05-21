import { createFileRoute, Link,useRouter } from '@tanstack/react-router'
import {fetchMeals} from '../../api/api.js'
import Loader from '../../../components/LoaderComponent.jsx'
import { useState } from 'react'

export const Route = createFileRoute('/meals/')({
  validateSearch:(search) => {
     return{
       page: search.page ? search.page : '1',
         preference: search.preference
     }
   },
   component: RouteComponent,
   loaderDeps:({search:{page, preference}}) => ({page, preference}),
   loader: ({deps:{page, preference}}) =>  fetchMeals(page, preference),
    pendingComponent: () => <Loader />,
    errorComponent: ({ error }) => <div>Error: {error.message}</div>,
})  

function RouteComponent() {
    // const [isRefreshed,setIsRefreshed] = useState(false);
    const router  = useRouter();
   const { page, preference } = Route.useSearch() // very important to use useSearch to get the current page number from the URL search parameters
   let {mealsData,data:meals} = Route.useLoaderData();
   const [type,setType] = useState(preference);

function filterMealsByPreference(dummyMeals, preference) {
    if (preference === 'Veg') {
        return dummyMeals.filter(meal => (meal.strCategory.toLowerCase() === 'vegetarian' || meal.strCategory === 'Dessert' || meal.strCategory === 'Starter' || meal.strCategory === 'Pasta' || meal.strCategory === 'Miscellaneous' || meal.strCategory === 'Side' || meal.strCategory === 'Breakfast' || meal.strCategory === 'Goat' || meal.strCategory === 'Vegan'));
    }else if (preference === 'Non-Veg') {
        return dummyMeals.filter(meal => !(meal.strCategory.toLowerCase() === 'vegetarian' || meal.strCategory === 'Dessert' || meal.strCategory === 'Starter' || meal.strCategory === 'Pasta' || meal.strCategory === 'Miscellaneous' || meal.strCategory === 'Side' || meal.strCategory === 'Breakfast' || meal.strCategory === 'Goat' || meal.strCategory === 'Vegan'));
    }
    return dummyMeals;
}
const dummyMeals = [...meals]
meals = filterMealsByPreference(dummyMeals, preference);

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

function handleSearch(e){
    setType(() => e.target.value);
    router.navigate({
        to: '/meals',
        search: {
          page: String(page),
          preference: e.target.value,
        },
      });
 }
    


  

  console.log(meals);
  return <div>

    <select style = {{margin:'auto', width: '200px'}} onChange={handleSearch} >
        <option>Any</option>
        <option>Veg</option>
        <option>Non-Veg</option>
    </select>

    <ul style = {{display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center'}} >
      {meals.map((meal) =>(<Link key = {meal.id} to={`/meals/$mealId`} params = {{mealId: meal.id}}  search={{ page , preference}} ><li style = {{display:'inline-block', margin:'auto'}} > <div>
        {meal.strMeal} <img style = {{display:'block', margin:'auto', width: '100px', height: '100px'}} src={meal.strMealThumb}  alt={meal.strMeal}/>
        </div> </li></Link>) )}
    </ul>
    <button onClick = {handleRefresh} >Refresh Meals</button>
    
  </div>
}
