import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchProducts, setPage, setSearchTerm } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isLoading, currentPage, searchTerm } = useSelector(
    (state: RootState) => state.products
  );
  const [search, setSearch] = useState(searchTerm);

  // Effect pour récupérer les produits chaque fois que la page ou le terme de recherche change
  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, search: searchTerm }));
  }, [dispatch, currentPage, searchTerm]);

  // Réinitialise le terme de recherche quand le composant se démonte
  useEffect(() => {
    return () => {
      dispatch(setSearchTerm("")); // Vide le champ de recherche
    };
  }, [dispatch]);

  // Gestion de la soumission de la recherche
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearchTerm(search));  // Met à jour le terme de recherche dans Redux
    dispatch(setPage(1));  // Revenir à la première page après une recherche
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Liste des Produits</h1>

      {/* Formulaire de recherche */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}  // Met à jour l'état local de recherche
          placeholder="Rechercher un produit..."
          className="border border-gray-300 px-4 py-2 rounded-l-lg w-80 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Rechercher
        </button>
      </form>

      {/* Affichage des produits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {isLoading ? (
          <p className="text-center text-gray-500 col-span-3">Chargement...</p>
        ) : items.length > 0 ? (
          items.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">{product.title}</h2>
              <p className="text-gray-600 mb-2">Prix : {product.price} EUR</p>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {product.reviews.length} Avis
                </span>
                <span className="text-gray-500 text-sm">Évaluation : {product.rating} / 5</span>
              </div>
              <Link
                to={`/products/${product.id}`}
                className="text-blue-500 underline hover:text-blue-700 mb-4 block"
              >
                Voir le produit
              </Link>
              <button
                onClick={() => dispatch(addToCart(product))}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
              >
                Ajouter au panier
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">Aucun produit trouvé.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default ProductList;