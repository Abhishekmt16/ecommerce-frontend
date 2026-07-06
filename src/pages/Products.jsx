import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showStartupMessage, setShowStartupMessage] = useState(false);

  const { addToCart } = useContext(CartContext);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // Fetch Products
  useEffect(() => {
  setLoading(true);
  setError(false);
  setShowStartupMessage(false);

  const timer = setTimeout(() => {
    setShowStartupMessage(true);
  }, 5000);

  api
    .get(`/api/products?page=${page}&size=6`)
    .then((res) => {
      setProducts(res.data.content);
      setTotalPages(res.data.totalPages);
    })
    .catch((err) => {
      console.error(err);
      setError(true);
    })
    .finally(() => {
      clearTimeout(timer);
      setLoading(false);
      setShowStartupMessage(false);
    });

  return () => clearTimeout(timer);

}, [page]);

  // Search
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort
  const sortedProducts = [...filteredProducts];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="p-6">

      {/* Title */}
      <h2 className="text-2xl font-bold mb-4">
        Products
      </h2>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full md:w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
        >
          <option value="">Sort</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

      </div>

      {/* Loading */}

      {loading ? (

        <>

          {/* Skeleton Cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[1, 2, 3, 4, 5, 6].map((item) => (

              <div
                key={item}
                className="bg-white rounded-xl shadow-md p-5 animate-pulse"
              >

                <div className="bg-gray-300 h-40 rounded-lg"></div>

                <div className="bg-gray-300 h-5 rounded mt-4"></div>

                <div className="bg-gray-300 h-4 rounded mt-2 w-2/3"></div>

                <div className="bg-gray-300 h-10 rounded mt-6"></div>

              </div>

            ))}

          </div>

          {/* Startup Message */}

          {showStartupMessage && (

            <div className="text-center mt-10">

              <div className="text-5xl mb-3">
                ⏳
              </div>

              <h2 className="text-2xl font-semibold">
                Starting backend server...
              </h2>

              <p className="text-gray-500 mt-3">
                This project is hosted on Azure's free tier.
                <br />
                The first request may take 10–30 seconds.
              </p>

              <p className="text-blue-600 mt-3 font-medium">
                Please wait while we load the products.
              </p>

            </div>

          )}

        </>

      ) : error ? (

        <div className="text-center py-16">

          <div className="text-5xl mb-4">
            ⚠️
          </div>

          <h2 className="text-2xl font-semibold">
            Products are temporarily unavailable
          </h2>

          <p className="text-gray-500 mt-3">
        Our server may be starting or experiencing a temporary issue.
        Please wait a few moments or try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Retry
          </button>

        </div>

      ) : sortedProducts.length === 0 ? (

        <div className="text-center py-16">

          <div className="text-5xl mb-4">
            📦
          </div>

          <h2 className="text-2xl font-semibold">
            No products available
          </h2>

          <p className="text-gray-500 mt-2">
            Please check back later.
          </p>

        </div>

      ) : (

        <>

          {/* Product Cards */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {sortedProducts.map((p) => (

              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
              >

                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-lg"
                />

                <h3 className="text-lg font-bold mt-3">
                  {p.name}
                </h3>

                <p className="text-gray-600">
                  ₹{p.price}
                </p>

                <button
                  onClick={() => {

                    if (!token) {
                      navigate("/login");
                      return;
                    }

                    addToCart(p);
                    toast.success("Added to cart 🛒");

                  }}
                  className={`mt-3 px-4 py-2 rounded w-full ${
                    token
                      ? "bg-blue-500 text-white hover:bg-blue-600"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  {token ? "Add to Cart" : "Login to Add"}
                </button>

              </div>

            ))}

          </div>

          {/* Pagination */}

          <div className="flex justify-center gap-4 mt-8">

            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-semibold self-center">
              Page {page + 1} of {totalPages}
            </span>

            <button
              disabled={page === totalPages - 1}
              onClick={() => setPage(page + 1)}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </>

      )}

    </div>
  );
}