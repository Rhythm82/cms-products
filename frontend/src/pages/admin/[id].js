import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import ProductForm from "../../components/ProductForm";
import api from "../../lib/api";
import toast from "react-hot-toast";

export default function EditPage(){
  const router = useRouter();
  const { id } = router.query;
  const [initial, setInitial] = useState(null);

  useEffect(()=>{
    if(!id) return;
    api.get("/api/products")
      .then(res => {
        const found = res.data.find(p => String(p.product_id) === String(id));
        setInitial(found || {});
      })
      .catch(()=> toast.error("Load failed"));
  },[id]);

  const handleUpdate = async (data) => {
    try {
      await api.put(`/api/products/${id}`, { ...data, updated_by: "admin" });
      toast.success("Updated");
      router.push("/admin");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <>
      <Navbar />
      <main className="p-6 max-w-3xl mx-auto">
        <h2 className="text-white text-2xl mb-4">Edit Product</h2>
        <div className="glass p-6">
          {initial === null ? <p className="text-slate-300">Loading...</p> :
            <ProductForm initial={initial} onSubmit={handleUpdate} submitText="Save Changes" />
          }
        </div>
      </main>
    </>
  );
}
