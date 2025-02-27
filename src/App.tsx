import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";

const App = () => {
  return (
    <Router>
      <div className="w-full mx-auto">
        <nav className="flex justify-center">
          <Link className="m-3" to="/">Accueil</Link>
          <Link className="m-3" to="/cart">Panier</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};


export default App;
