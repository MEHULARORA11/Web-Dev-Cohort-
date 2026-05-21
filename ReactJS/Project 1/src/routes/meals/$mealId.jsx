import { createFileRoute ,Link} from '@tanstack/react-router'
import {fetchMeal} from '../../api/api.js'
import Loader from '../../../components/LoaderComponent.jsx'

export const Route = createFileRoute('/meals/$mealId')({
  validateSearch:(search) => {
     return{
       page: search.page ? search.page : '1',
     }
   },
   component: RouteComponent,
   loader: async ({ params }) => {
      //  throw new Error('There was an error fetching the user data. Please try again later.');
      const { mealId } = params;
      
        const meal = await fetchMeal(mealId);
          return meal
      
    },
    pendingComponent:() => <Loader />,
    errorComponent: ({ error }) => <div>Error: {error.message}</div>,
})

function RouteComponent() {
    const meal =  Route.useLoaderData(); // this will give u the user data that u fetched in the loader function and u can use it to display the user details in this component
    const {page} = Route.useSearch() // => important  // by this u can extract the page number from the search params and use it to navigate back to the correct page of users list 
    
console.log(meal);
const ingredients = [];
for (let i = 1; i <= 20; i++) {
  let ingredient = meal[`strIngredient${i}`];
  let measure = meal[`strMeasure${i}`];
  if (ingredient) {
    ingredients.push(` Ingredient${i}: ${ingredient}, Measurement${i} : ${measure}`);
  }
  ingredient = null;
  measure = null; 
}

 return <div>
   
      <div>
        <h2>{meal.strMeal}</h2>
        <img style = {{display:'block', margin:'auto', width: '200px', height: '200px'}} src={meal.strMealThumb} alt={meal.strMeal} />
        <h1> Meal Type: {meal.strArea}</h1>
        <h2>Dietary Preference:- {meal.strCategory}</h2>
        <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer">
          Watch Video
        </a>
        <p>{meal.strInstructions}</p>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      
    <Link to={`/meals/`}  search={{ page }} ><button><h1>Back to Meals</h1></button></Link>
    
  </div>
}
