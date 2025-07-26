import { useState } from "react";
import { useCreateProductMutation } from "../features/api/productApi";
import { toast } from "sonner";

const categoryOptions = [
  "Vegetables",
  "Fruits",
  "Grains",
  "Dairy",
  "Meat",
  "Seafood",
  "Beverages",
  "Snacks",
  "Condiments",
  "Spices",
];

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    pricing: {
      basePrice: "",
      unit: "",
      minimumOrderQuantity: "",
    },
    inventory: {
      quantity: "",
    },
    images: [],
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("pricing.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        pricing: { ...prev.pricing, [field]: value },
      }));
    } else if (name.startsWith("inventory.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        inventory: { ...prev.inventory, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, images: Array.from(e.target.files) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submission = new FormData();
    submission.append("name", formData.name);
    submission.append("description", formData.description);
    submission.append("category", formData.category);
    submission.append("pricing.basePrice", formData.pricing.basePrice);
    submission.append("pricing.unit", formData.pricing.unit);
    submission.append("pricing.minimumOrderQuantity", formData.pricing.minimumOrderQuantity);
    submission.append("inventory.quantity", formData.inventory.quantity);
    formData.images.forEach((file) => {
      submission.append("images", file);
    });

    try {
      const res = await createProduct(submission).unwrap();
      toast.success(res.message || "Product created!");
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className="min-h-screen px-4 py-8 bg-orange-50 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-xl"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-xl"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-xl"
          >
            <option value="">Select Category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="pricing.basePrice"
              placeholder="Base Price"
              value={formData.pricing.basePrice}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-xl"
            />
            <input
              type="text"
              name="pricing.unit"
              placeholder="Unit (e.g., kg, litre)"
              value={formData.pricing.unit}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-xl"
            />
            <input
              type="number"
              name="pricing.minimumOrderQuantity"
              placeholder="Minimum Order Quantity"
              value={formData.pricing.minimumOrderQuantity}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-xl"
            />
            <input
              type="number"
              name="inventory.quantity"
              placeholder="Available Quantity"
              value={formData.inventory.quantity}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-xl"
            />
          </div>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-orange-500 text-white py-2 rounded-xl hover:bg-orange-600"
          >
            {isLoading ? "Uploading..." : "Add Product"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddProduct;
