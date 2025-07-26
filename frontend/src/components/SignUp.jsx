import { useState, useEffect } from "react";
import { useRegisterMutation } from "../features/api/authApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [signupInput, setSignupInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const roles = [
    { id: "buyer", label: "Buyer" },
    { id: "supplier", label: "Supplier" },
  ];

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await registerUser(signupInput).unwrap();
    } catch (err) {
      console.error("Error from registerUser:", err);
    }
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successful.");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed");
    }
  }, [registerIsSuccess, registerError, registerData]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-orange-50 px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create New Account
        </h2>

        <form className="space-y-5" onSubmit={handleRegistration}>
          <div>
            <label className="block text-sm text-gray-600">First Name</label>
            <input
              type="text"
              name="firstName"
              value={signupInput.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Your First Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={signupInput.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Your Last Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={signupInput.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={signupInput.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Choose a strong password"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">User Role</label>
            <select
              name="role"
              value={signupInput.role}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-orange-600 transition"
            disabled={registerIsLoading}
          >
            {registerIsLoading ? (
              <div className="flex justify-center items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Please wait
              </div>
            ) : (
              "Signup"
            )}
          </button>

          <p className="text-center text-sm mt-4">
            Already Registered?{" "}
            <a
              href="/login"
              className="text-orange-500 font-medium hover:underline"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
