import React, { useEffect, useState } from 'react';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch('/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data));
  }, []);

  return (
    <div>
      <h2 class="title">Pizza List</h2>
      <ul class="alllist">
        {pizzas.map(pizza => (
          <li key={pizza.id}>
            <strong>{pizza.name}</strong> - {pizza.ingredients}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;