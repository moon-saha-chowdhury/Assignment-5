const searchButton = document.getElementById('search-button');
const allFood = document.getElementById('all-food');
const foodDetails = document.getElementById('food-details');
const invalidFood = document.getElementById('invalid-food');

//Creating Function to Add Event Listener for Search Button
const buttonClick =()=>{
    const searchInput = document.getElementById('search-input').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then(response => response.json())
    .then(data =>{
        searchFood(data.meals);
    })

    .catch(error => {
        const errorDiv = `
        <div class="alert-user">
        <img class="alert-image" src="images/expression.jpg">
        <h3 class="alert-text">Food Is Not Available</h3>
        </div>
        `;
        invalidFood.innerHTML = errorDiv;
        allFood.innerHTML ="";
        foodDetails.innerHTML ="";

    })
}

//creating function for searching food & handle no input
const searchFood = foods =>{
const searchInput = document.getElementById('search-input').value;
if(searchInput ===''){
    const userAlert =`
    <div class="alert-user">
    <img class="alert-image" src="images/expression.jpg">
    <h3 class="alert-text">Enter Food Name First </h3>
    </div>
    `;
    invalidFood.innerHTML = userAlert;
    allFood.innerHTML ="";
    foodDetails.innerHTML ="";

}

else{

    let foodContainer ="";
    foods.forEach(oneFood => {
        foodContainer += `
        <div onclick="foodClick(${oneFood.idMeal})" class ="food-card">
        <img class="food-image" src="${oneFood.strMealThumb}">
        <div class="food-title">
        <h4 class="food-name">${oneFood.strMeal}</h4>
        </div>
        </div>

        `;
        allFood.innerHTML = foodContainer;
        invalidFood.innerHTML ="";
        foodDetails.innerHTML ="";
        
    });
}

}

//Creating Function to add event listener for entire div
const foodClick =foodId=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
    .then(response => response.json())
    .then(data => {
        foodIngredient(data.meals[0]);
    } )
}
//Another function to Show ingredients details
const foodIngredient = ingredientId =>{
    const ingredientDetail = `
    <div class="ingredient">
    <img class="ingredient-img" src="${ingredientId.strMealThumb}">
    <div class="food-ingredient">
    <h1 class="food-names">${ingredientId.strMeal}</h1>
    <h3 class="title">Ingredients</h3>
    <ul>
    <li>${ingredientId.strIngredient1}</li>
    <li>${ingredientId.strIngredient2}</li>
    <li>${ingredientId.strIngredient3}</li>
    <li>${ingredientId.strIngredient4}</li>
    <li>${ingredientId.strIngredient5}</li>
    <li>${ingredientId.strIngredient6}</li>
    <li>${ingredientId.strIngredient7}</li>
    </ul>
    </div>
    
    </div>
    `;
    foodDetails.innerHTML = ingredientDetail;
    invalidFood.innerHTML ="";
}