import React, { useState } from "react";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import { CartProvider } from "./components/CartContext";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";

const dishes = [
  {
    id: 0,
    name: "Uthappizza",
    image: "images/1.jpg",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
  },
  {
    id: 1,
    name: "Zucchipakoda",
    image: "images/2.jpg",
    price: "1.99",
    description: "Deep fried Zucchini with chickpea batter.",
  },
  {
    id: 2,
    name: "Vadonut",
    image: "images/3.jpg",
    price: "1.99",
    description: "A combination of vada and donut.",
  },
  {
    id: 3,
    name: "ElaiCheese Cake",
    image: "images/4.jpg",
    price: "2.99",
    description: "New York Style Cheesecake with Indian cardamoms.",
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <CartProvider>
      <div className={darkMode ? "bg-dark text-light min-vh-100" : "bg-light text-dark min-vh-100"}>
        <Header onToggleDarkMode={setDarkMode} />
        <div className="container py-4">
          <DishesList dishes={dishes} />
          <Cart />
        </div>
      </div>
    </CartProvider>
  );
}

export default App;