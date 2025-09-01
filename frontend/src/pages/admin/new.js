import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import ProductForm from "../../components/ProductForm";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function NewProduct(){
  const router = useRouter();

  const handleCreate = async (data) => {
    try {
      await api.post("/api/products", { ...data, created_by: "admin" });
      toast.success("Created");
      router.push("/admin");
    } catch {
      toast.error("Create failed");
    }
  };

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto">
        <h2 className="text-white text-3xl mb-4 font-bold text-center mt-2 mb-8">New Product</h2>
        <div >
          <ProductForm onSubmit={handleCreate} submitText="Create" />
        </div>
      </main>
    </>
  );
}
