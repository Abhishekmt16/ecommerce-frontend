import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { CartContext } from "../context/CartContext";
import { toast } from "react-toastify";

export default function Products() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  // 📦 FETCH PRODUCTS
  useEffect(() => {
    api.get(`/api/products?page=${page}&size=6`)
      .then((res) => {
        setProducts(res.data.content);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error(err));
  }, [page]);

  // 🔍 SEARCH
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔽 SORT
  let sortedProducts = [...filteredProducts];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="p-6">

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {/* 🔍 SEARCH + SORT */}
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

      {/* PRODUCTS */}
      {sortedProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {sortedProducts.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
              >

                {/* IMAGE */}
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded-lg"
                />

                {/* DETAILS */}
                <h3 className="text-lg font-bold mt-2">{p.name}</h3>
                <p className="text-gray-600">₹{p.price}</p>

                {/* BUTTON */}
                <button
                  onClick={() => {
                if (!token) {
                  navigate("/login");
                  return;
                }

                addToCart(p);
                toast.success("Added to cart 🛒"); // ✅ NEW
              }}
                  className={`mt-3 px-4 py-2 rounded ${
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

          {/* PAGINATION */}
          <div className="flex justify-center gap-4 mt-6">
            
            <button
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="font-semibold">
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