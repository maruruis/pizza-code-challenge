from app import app, db
from faker import Faker
from models import db, Restaurant, Pizza, RestaurantPizza

fake = Faker()

def clear_data():
    with app.app_context():
        db.session.query(RestaurantPizza).delete()
        db.session.query(Restaurant).delete()
        db.session.query(Pizza).delete()
        db.session.commit()

def seed():
    clear_data()

    with app.app_context():
        # Seed Restaurants
        restaurants = [
            Restaurant(name=fake.company(), address=fake.address()) for _ in range(10)
        ]
        db.session.add_all(restaurants)
        db.session.commit()

        # Seed Pizzas
        pizzas_data = [
            {"name": "Mozzarella", "ingredients": "Tomato Sauce, Buffalo mozzarella"},
            {"name": "Marinara", "ingredients": "Tomato Sauce, Buffalo mozzarella"},
            {"name": "Hawaiian", "ingredients": "Tomato sauce, Cheese, Pineapple, Ham"},
            {"name": "Mexican Style", "ingredients": "Tomato sauce, Enchilada sauce, Black beans, Mexican cheese"},
            {"name": "Tropical", "ingredients": "Tomato sauce, Cheese, Pineapple, Cherry, Raisins, Plum"},
            {"name": "Vegetarian Delight", "ingredients": "Tomato sauce, Mixed vegetables, Feta cheese"},
            {"name": "BBQ Chicken", "ingredients": "BBQ sauce, Chicken, Red onions, Gouda cheese"},
            {"name": "Seafood Supreme", "ingredients": "White sauce, Shrimp, Scallops, Crab, Mozzarella"},
            {"name": "Margherita", "ingredients": "Tomato Sauce, Fresh Mozzarella, Basil"},
            {"name": "Pepperoni Lover's", "ingredients": "Tomato sauce, Cheese, Pepperoni"},
        ]

        pizzas = [Pizza(name=pizza["name"], ingredients=pizza["ingredients"]) for pizza in pizzas_data]
        db.session.add_all(pizzas)
        db.session.commit()

        # Seed RestaurantPizzas
        restaurant_pizzas = [
            RestaurantPizza(
                price=fake.random_int(min=1, max=30),
                restaurant_id=fake.random_element(elements=[r.id for r in restaurants]),
                pizza_id=fake.random_element(elements=[p.id for p in pizzas]),
            ) for _ in range(5)
        ]
        db.session.add_all(restaurant_pizzas)
        db.session.commit()

if __name__ == "__main__":
    seed()
