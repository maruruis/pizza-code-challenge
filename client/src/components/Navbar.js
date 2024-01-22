// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  

  return (

    <nav class="navbar navbar-expand-lg bg-body-tertiary mb-5 bg-primary" >
      <div class="container-fluid">
        <Link to="/" class="navbar-brand">Cheesy Chuckles Pizzeria</Link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse mx-4" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <Link to="/" class="nav-link active" aria-current="page">Home</Link>
            </li>
            <li class="nav-item">
              <Link to="/pizzas" class="nav-link">Pizzas</Link>
            </li>
            <li class="nav-item">
              <Link to="/restaurants" class="nav-link">Restaurants</Link>
            </li>
          </ul>
          <span class="navbar-text mx-4">
            Best pizzas in Town
          </span>
        </div>
      </div>
    </nav>

  );


};




export default Navbar;