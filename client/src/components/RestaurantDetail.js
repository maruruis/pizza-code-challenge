// RestaurantDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RestaurantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [pizzas, setPizzas] = useState([]);
  const [formData, setFormData] = useState({
    price: '',
    pizza_id: '',
  });

  useEffect(() => {
    fetch(`/restaurants/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Restaurant not found');
        }
        return response.json();
      })
      .then(data => setRestaurant(data))
      .catch(error => console.error('Error fetching restaurant:', error));

    fetch('/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => console.error('Error fetching pizzas:', error));
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('/restaurant_pizzas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: formData.price,
        pizza_id: formData.pizza_id,
        restaurant_id: id,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Pizza added successfully:', data);

        // Update the local state with the new pizza data
        setRestaurant(prevRestaurant => ({
          ...prevRestaurant,
          pizzas: [...prevRestaurant.pizzas, data],
        }));

        // Clear the form data
        setFormData({
          price: '',
          pizza_id: '',
        });
      })
      .catch(error => console.error('Error adding pizza:', error));
  };

  const handleDeleteRestaurant = () => {
    if (window.confirm("Are you sure you want to delete this restaurant?")) {
      fetch(`/restaurants/${id}`, { method: 'DELETE' })
        .then(response => {
          if (response.ok) {
            // Handle successful deletion
            console.log('Restaurant deleted successfully');
            navigate('/');  // Redirect to home page after deletion using useNavigate
          } else {
            // Handle error response
            console.error('Failed to delete restaurant');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div>
      {restaurant ? (
        <div>
          <h2 class = "title">{restaurant.name}</h2>
          <h3 class ="p-4 mx-4">Pizzas in {restaurant.name}</h3>
          <ul class ="alllist mt-0 pt-0">
            {restaurant.pizzas.map(pizza => (
              <li key={pizza.id}>{pizza.name} - {pizza.ingredients}</li>
            ))}
          </ul>
          <h3 class ="p-4 pt-0 mx-4" >Add Pizza to {restaurant.name}</h3>
          <form onSubmit={handleFormSubmit} class="addform">
            <label>
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder='Price:'
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </label>
            <br />
            <label>
              
              <select
                name="pizza_id"
                value={formData.pizza_id}
                onChange={(e) => setFormData({ ...formData, pizza_id: e.target.value })}
              >
                <option value="">Select Pizza</option>
                {pizzas.map(pizza => (
                  <option key={pizza.id} value={pizza.id}>{pizza.name}</option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit" class="buttons">Add Pizza</button>
          </form>

          {/* Button to delete the restaurant */}
          <button onClick={handleDeleteRestaurant} class="buttons delete">Delete Restaurant</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/" class="home">Back to Home</Link>
    </div>
  );
};

export default RestaurantDetail;