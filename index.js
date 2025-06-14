document.addEventListener('DOMContentLoaded', () => {
  const foodInput = document.getElementById('foodInput');
  const addButton = document.getElementById('addButton');
  const clearButton = document.getElementById('clearButton');
  const totalCalories = document.getElementById('totalCalories');
  const foodList = document.getElementById('foodList');
  let total = 0;
  const APP_ID = '425f2b20'; 
  const APP_KEY = '70959b6e72c5488020b12dfdac66106e'; 
  addButton.addEventListener('click', () => {
    const food = foodInput.value.trim();
    if (!food) {
      alert('Please enter a food name');
      return;
    }
    fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': '425f2b20',
        'x-app-key': '70959b6e72c5488020b12dfdac66106e'
      },
      body: JSON.stringify({ query: food })
    })
    .then(res => res.json())
    .then(data => {
      if (data.foods && data.foods.length > 0) {
        const item = data.foods[0];
        const calories = item.nf_calories;

        total += calories;
        totalCalories.textContent = total.toFixed(2);

        const li = document.createElement('li');
        li.textContent = `${item.food_name} - ${calories.toFixed(2)} cal`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'ml-4 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700';
        removeBtn.addEventListener('click', () => {
          total -= calories;
          totalCalories.textContent = total.toFixed(2);
          foodList.removeChild(li);
        });

        li.appendChild(removeBtn);
        foodList.appendChild(li);
        foodInput.value = '';
      } else {
        alert('Food not found. Please try a different name.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error fetching data. Please check your API key or try again.');
    });
  });
  clearButton.addEventListener('click', () => {
    total = 0;
    totalCalories.textContent = "0.00";
    foodList.innerHTML = "";
  });
});
