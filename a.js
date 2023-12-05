async function searchMeal() {
    const searchInput = document.getElementById('search');
    const searchValue = searchInput.value.trim();

    if (!searchValue) {
        alert('Please enter a search value');
        return;
    }

    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`);
        const data = await response.json();

        if (data.meals === null) {
            alert('No meals found for your search value');
            return;
        }

        displayMeals(data.meals);
    } catch (error) {
        console.error('Error:', error);
    }
}

function displayMeals(meals) {
    const mealList = document.getElementById('meal-list');
    mealList.innerHTML = '';

    meals.slice(0, 5).forEach(meal => {
        const listItem = document.createElement('div');
        listItem.className = 'meal-item';

        listItem.innerHTML = `
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <ul>
                <li>Category: ${meal.strCategory}</li>
                <li>Area: ${meal.strArea}</li>
                <li>Tags: ${meal.strTags}</li>
            </ul>
        `;

        mealList.appendChild(listItem);
    });
}