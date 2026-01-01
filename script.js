document.addEventListener('DOMContentLoaded', () => {
    const foodForm = document.getElementById('food-form');
    const foodList = document.getElementById('food-list');
    const totalCaloriesEl = document.getElementById('total-calories');
    const totalProteinEl = document.getElementById('total-protein');
    const totalCarbsEl = document.getElementById('total-carbs');
    const totalFatEl = document.getElementById('total-fat');

    let foodItems = JSON.parse(localStorage.getItem('foodItems')) || [];

    const renderFoodItems = () => {
        foodList.innerHTML = '';
        foodItems.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} - ${item.calories} kcal</span>
                <button data-index="${index}">Remove</button>
            `;
            foodList.appendChild(li);
        });
        updateTotalNutrition();
    };

    const updateTotalNutrition = () => {
        const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);
        const totalProtein = foodItems.reduce((sum, item) => sum + item.protein, 0);
        const totalCarbs = foodItems.reduce((sum, item) => sum + item.carbs, 0);
        const totalFat = foodItems.reduce((sum, item) => sum + item.fat, 0);

        totalCaloriesEl.textContent = totalCalories;
        totalProteinEl.textContent = totalProtein;
        totalCarbsEl.textContent = totalCarbs;
        totalFatEl.textContent = totalFat;
    };

    foodForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newFood = {
            name: document.getElementById('food-name').value,
            calories: parseInt(document.getElementById('calories').value),
            protein: parseInt(document.getElementById('protein').value),
            carbs: parseInt(document.getElementById('carbs').value),
            fat: parseInt(document.getElementById('fat').value),
        };
        foodItems.push(newFood);
        localStorage.setItem('foodItems', JSON.stringify(foodItems));
        renderFoodItems();
        foodForm.reset();
    });

    foodList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.dataset.index;
            foodItems.splice(index, 1);
            localStorage.setItem('foodItems', JSON.stringify(foodItems));
            renderFoodItems();
        }
    });

    renderFoodItems();
});
