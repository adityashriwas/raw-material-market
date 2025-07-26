import { useEffect, useState } from "react";
import { useLoginMutation } from "../features/api/authApi";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInput((prev) => ({ ...prev, [name]: value }));
  };

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    loginUser(loginInput);
  };

  useEffect(() => {
    if (loginIsSuccess) {
      // Handle successful login here
      if (loginIsSuccess && loginData) {
        toast.success(loginData.message || "Login successful.");
        navigate("/profile");
      }
      if (loginError) {
        toast.error(loginError.data.message || "login Failed");
      }
    }
  }, [loginIsSuccess, loginIsLoading, loginData, loginError]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-orange-50 px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Login to Your Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={loginInput.email}
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
              value={loginInput.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="••••••••"
              required
            />
          </div>

          <button className="w-full bg-orange-500 text-white py-2 rounded-xl font-semibold hover:bg-orange-600 transition">
            {loginIsLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-center text-sm mt-4">
            New here?{" "}
            <a
              href="/signup"
              className="text-orange-500 font-medium hover:underline"
            >
              Create an account
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};
export default Login;
