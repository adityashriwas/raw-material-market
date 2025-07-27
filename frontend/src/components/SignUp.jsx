import { useState } from "react";
import { useRegisterMutation } from "../features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "buyer",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    company: {
      name: "",
      type: "",
      registrationNumber: "",
      website: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else if (name.startsWith("company.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        company: { ...prev.company, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await register(formData);
      if (error) throw error;
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err) {
      toast.error(err?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-orange-600">Create Your Account</h2>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="email"
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="input"
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input"
          >
            <option value="buyer">Buyer</option>
            <option value="supplier">Supplier</option>
          </select>
        </div>

        {/* Address Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Address (Optional)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="address.street"
              placeholder="Street"
              value={formData.address.street}
              onChange={handleChange}
              className="input"
            />
            <input
              name="address.city"
              placeholder="City"
              value={formData.address.city}
              onChange={handleChange}
              className="input"
            />
            <input
              name="address.state"
              placeholder="State"
              value={formData.address.state}
              onChange={handleChange}
              className="input"
            />
            <input
              name="address.zipCode"
              placeholder="Zip Code"
              value={formData.address.zipCode}
              onChange={handleChange}
              className="input"
            />
            <input
              name="address.country"
              placeholder="Country"
              value={formData.address.country}
              onChange={handleChange}
              className="input"
            />
          </div>
        </div>

        {/* Company Info (Supplier Only) */}
        {formData.role === "supplier" && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Company Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="company.name"
                placeholder="Company Name"
                value={formData.company.name}
                onChange={handleChange}
                className="input"
              />
              <input
                name="company.type"
                placeholder="Company Type"
                value={formData.company.type}
                onChange={handleChange}
                className="input"
              />
              <input
                name="company.registrationNumber"
                placeholder="Registration Number"
                value={formData.company.registrationNumber}
                onChange={handleChange}
                className="input"
              />
              <input
                name="company.website"
                placeholder="Website URL"
                value={formData.company.website}
                onChange={handleChange}
                className="input"
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full md:w-1/3 px-4 py-2 rounded bg-orange-600 text-white font-semibold hover:bg-orange-700 transition duration-200"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
