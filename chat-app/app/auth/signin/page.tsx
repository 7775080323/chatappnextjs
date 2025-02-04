"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useLoginMutation } from "@/store/services/authService"; // Use correct mutation
import { useRouter } from "next/navigation"; 

const Page = () => {
  const router = useRouter();

  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Use the login mutation hook for making API requests
  const [login, { isLoading }] = useLoginMutation();

  // Redirect logged-in users away from login page
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/"); // Redirect if already logged in
    }
  }, [router]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  // Validation function
const validateForm = () => {
  const newErrors = { email: "", password: "" };

  if (!email) newErrors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email address is invalid";

  if (!password) newErrors.password = "Password is required";
  else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

  setErrors(newErrors);
  return newErrors;
};

  try {
    // Make the login request with .unwrap() to properly handle errors
    const response = await login({ email, password }).unwrap();

    if (response?.token) {
      localStorage.setItem("authToken", response.token); // Store token
      alert("Login successful!");
      router.push("/"); // Redirect user to dashboard
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email or password" }));
    }
  } catch (err: any) {
    console.error("Login Error:", err);

    const errorMessage =
      err?.data?.message || "Something went wrong. Please try again.";

    setErrors((prevErrors) => ({ ...prevErrors, email: errorMessage }));
  }
};
   

  return (
    <div className="flex">
      <div className="bg-[url('/images/chat.jpg')] bg-no-repeat bg-cover h-screen hidden lg:block lg:w-[50%] xl:w-[65%]"></div>
      <div className="flex-1 flex h-screen items-center justify-center px-4">
        <form className="w-[90%]" onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold text-white capitalize mb-8">Signin</h1>

          {/* Email field */}
          <div className="mt-6">
            <input
              type="email"
              name="email"
              placeholder="Email..."
              className="w-full h-14 rounded-lg outline-none px-4 bg-[#312F2F] text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password field */}
          <div className="mt-6">
            <input
              type="password"
              name="password"
              placeholder="Enter Password..."
              className="w-full h-14 rounded-lg outline-none px-4 bg-[#312F2F] text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Login button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full block cursor-pointer bg-[#00FF38] text-black text-lg font-semibold capitalize h-14 px-4 rounded-lg"
              disabled={isLoading} // Disable button when submitting
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>

          {/* Link to signup */}
          <Link
            href="/auth/signup"
            className="inline-block mt-4 text-zinc-400 font-semibold hover:text-white focus:text-white"
          >
            Don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Page;
