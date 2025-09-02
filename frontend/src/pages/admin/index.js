import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://cms-products-2.onrender.com/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const product = products.find((p) => p.product_id === id);
      const newStatus = currentStatus === "Published" ? "Draft" : "Published";

      await axios.put(`https://cms-products-2.onrender.com/api/products/${id}`, {
        ...product,
        status: newStatus,
        updated_by: "admin",
      });

      fetchProducts();
    } catch (err) {
      console.error("Error updating product:", err.response?.data || err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://cms-products-2.onrender.com/api/products/${id}`, {
        data: { updated_by: "admin" },
      });
      setDeleteTarget(null);
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen from-purple-900 via-indigo-900 to-black p-10">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold text-white">Admin Panel</h1>
          <Link href="/admin/new">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-xl bg-green-600 text-white font-semibold shadow-md"
            >
              + New Product
            </motion.div>
          </Link>
        </div>

        {/* Products List */}
        <div className="grid gap-8">
          {products.map((p) => (
            <motion.div
              key={p.product_id}
              whileHover={{ scale: 1.01 }}
              className={`glass p-6 rounded-2xl shadow-xl flex flex-col md:flex-row md:justify-between md:items-start gap-6 ${
                p.is_deleted ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              {/* LEFT: Product Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-white mb-3">
                  {p.product_name}
                </h2>
                <p className="text-slate-200 text-m mb-5">{p.product_desc}</p>

                <div className="space-y-1 text-sm text-slate-300">
                  <p>
                    <span className="font-bold">Created:</span>{" "}
                    {new Date(p.created_at).toLocaleString()} by {p.created_by}
                  </p>
                  {p.updated_at && (
                    <p>
                      <span className="font-bold">Updated:</span>{" "}
                      {new Date(p.updated_at).toLocaleString()} by{" "}
                      {p.updated_by || "N/A"}
                    </p>
                  )}
                  <p>
                    <span className="font-bold">Status:</span>{" "}
                    {p.is_deleted ? (
                      <span className="text-red-400">Deleted</span>
                    ) : (
                      <span
                        className={`${
                          p.status === "Published"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {p.status}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* RIGHT: Action Controls */}
              {!p.is_deleted && (
                <div className="flex flex-col gap-4 md:w-48">
                  {/* Status Switch */}
                  <div
                    onClick={() => toggleStatus(p.product_id, p.status)}
                    className="relative w-full h-10 rounded-full cursor-pointer bg-blue-300/10 border border-blue-600/60 flex items-center"
                  >
                    <motion.div
                      animate={{
                        x: p.status === "Published" ? "100%" : "0%",
                      }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="absolute top-0 left-0 w-1/2 h-full bg-blue-600/60 rounded-full"
                    />
                    <div className="w-1/2 text-center text-sm text-white font-semibold z-10">
                      Draft
                    </div>
                    <div className="w-1/2 text-center text-sm text-white font-semibold z-10">
                      Published
                    </div>
                  </div>

                  {/* Edit Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push(`/admin/${p.product_id}`)}
                    className="px-4 py-2 rounded-xl relative overflow-hidden bg-blue/10 backdrop-blur-lg border border-white/20 text-white font-semibold shadow-md transition-all"
                  >
                    <span className="relative z-10">Edit</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-green-500 to-green-500 animate-shine opacity-30"></span>
                  </motion.button>

                  {/* Delete Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setDeleteTarget(p.product_id)}
                    className="px-4 py-2 rounded-xl bg-red-500/70 border text-gray-100 border-red-400/40 w-full cursor-pointer "
                  >
                    Delete
                  </motion.button>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass p-8 rounded-2xl max-w-md w-full text-center"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Confirm Deletion
              </h2>
              <p className="text-slate-300 mb-6">
                Are you sure you want to delete this product?
              </p>

              <div className="flex justify-center gap-6">
                <button
                  onClick={() => setDeleteTarget(null)}
                  className="px-6 py-2 rounded-xl bg-slate-600/30 text-white border border-slate-500/40 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteProduct(deleteTarget)}
                  className="px-6 py-2 rounded-xl bg-red-600/50 text-red-200 border border-red-400/40 cursor-pointer"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </>
  );
}
