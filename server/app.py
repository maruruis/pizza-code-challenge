from flask import Flask, jsonify, request
from flask_migrate import Migrate
from models import db, Restaurant, Pizza, RestaurantPizza

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

migrate = Migrate(app, db)

db.init_app(app)

# Welcome route
@app.route('/')
def home():
    return "Welcome to Pizza Mania"

# Get all restaurants
@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    restaurants_data = [
        {'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address}
        for restaurant in restaurants
    ]
    return jsonify(restaurants_data)

# Get restaurant by ID
@app.route('/restaurants/<int:restaurant_id>', methods=['GET', 'DELETE'])
def get_restaurant_by_id(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if request.method == 'GET':
        if restaurant:
            pizzas_data = [
                {'id': rp.pizza.id, 'name': rp.pizza.name, 'ingredients': rp.pizza.ingredients}
                for rp in restaurant.pizzas
            ]
            restaurant_data = {
                'id': restaurant.id,
                'name': restaurant.name,
                'address': restaurant.address,
                'pizzas': pizzas_data
            }
            return jsonify(restaurant_data)
        else:
            return jsonify({"error": "Restaurant not found"}), 404

    elif request.method == 'DELETE':
        if restaurant:
            # Delete associated RestaurantPizzas
            RestaurantPizza.query.filter_by(restaurant_id=restaurant.id).delete()
            db.session.delete(restaurant)
            db.session.commit()
            return '', 204
        else:
            return jsonify({"error": "Restaurant not found"}), 404

# Get all Pizzas
@app.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    pizzas_data = [
        {'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients}
        for pizza in pizzas
    ]
    return jsonify(pizzas_data)

# Post RestaurantPizzas
@app.route('/restaurant_pizzas', methods=['POST'])
def post_restaurant_pizza():
    data = request.get_json()

    # Validate the data
    if 'price' not in data or not (1 <= int(data['price']) <= 30):  # Convert to integer
        return jsonify({"errors": ["Validation errors"]}), 400

    pizza = Pizza.query.get(data.get('pizza_id'))
    restaurant = Restaurant.query.get(data.get('restaurant_id'))

    # Check if Pizza and Restaurant exist
    if not pizza or not restaurant:
        return jsonify({"errors": ["Pizza or Restaurant not found"]}), 404

    new_restaurant_pizza = RestaurantPizza(
        price=int(data.get('price')),  # Convert to integer
        pizza=pizza,
        restaurant=restaurant
    )
    db.session.add(new_restaurant_pizza)
    db.session.commit()

    # Return the data related to the Pizza
    response_data = {
        'id': pizza.id,
        'name': pizza.name,
        'ingredients': pizza.ingredients
    }
    return jsonify(response_data), 201


if __name__ == '__main__':
    app.run(debug=True)