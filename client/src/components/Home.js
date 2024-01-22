
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RestaurantListItem = ({ restaurant }) => (
  <li key={restaurant.id}>
    <Link to={`/restaurants/${restaurant.id}`}>
      <strong>{restaurant.name}</strong> - {restaurant.address}
    </Link>
  </li>
);

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data));
  }, []);

  return (
    <div>
      <h2 class="title">All Restaurants</h2>
      <ul class="alllist">
        {restaurants.map(restaurant => (
          <RestaurantListItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </ul>
    </div>
  );
};

export default Home;