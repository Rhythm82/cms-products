import { useState } from "react";

export default function ProductForm({ initial = {}, onSubmit, submitText = "Save" }) {
  const [name, setName] = useState(initial.product_name || "");
  const [desc, setDesc] = useState(initial.product_desc || "");
  const [status, setStatus] = useState(initial.status || "");

  // Determine progress segments
  const progress = [
    name.trim() !== "",
    desc.trim() !== "",
    status.trim() !== "",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return alert("Name is required");
    onSubmit({ product_name: name, product_desc: desc, status });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg space-y-8"
    >
      {/* Progress Bar */}
      <div className="flex justify-between mb-6">
        {progress.map((filled, i) => (
          <div key={i} className="w-1/3 h-2 rounded-full bg-gray-400/50 relative">
            {filled && (
              <div className="absolute top-0 left-0 h-2 rounded-full bg-indigo-500/80 transition-all duration-500 w-full" />
            )}
          </div>
        ))}
      </div>

      {/* Name Field */}
      <div className="flex flex-col">
        <label className="text-gray-200 font-medium mb-2">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          className="p-4 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition w-full text-lg"
        />
      </div>

      {/* Description Field */}
      <div className="flex flex-col">
        <label className="text-gray-200 font-medium mb-2">Description</label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Enter product description"
          rows={5}
          className="p-4 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition w-full text-lg resize-none"
        />
      </div>

      {/* Status Field */}
      <div className="flex flex-col">
        <label className="text-gray-200 font-medium mb-2">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-4 rounded-lg bg-white/20 text-gray-400 border border-white/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition w-full text-lg cursor-pointer"
        >
          <option value="">Select status</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Archived">Archived</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="px-8 py-3 bg-indigo-500/90 hover:bg-indigo-600 rounded-lg text-white font-semibold shadow-md text-lg transition"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
}


