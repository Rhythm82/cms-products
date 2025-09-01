import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import api from "../lib/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .get("/api/products/live")
      .then((res) => {
        if (mounted) setProducts(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Navbar />
      <main className="p-4 mt-6 max-w-7xl mx-auto space-y-8">
        <h1 className="text-white text-3xl font-bold">Live Products</h1>

        {loading ? (
          <p className="text-slate-300">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((p) => (
              <ProductCard key={p.product_id} product={p} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
