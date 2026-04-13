"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captchaToken: "dev-bypass-if-needed" // Ensure your UI actually sets this if you use CAPTCHA!
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      // 🐛 DEBUGGING: This will print the API response to your browser console
      console.log("LOGIN API RESPONSE:", data);

      if (response.ok && data.success) {
        const extractedRole = data.user?.role;
        
        if (!extractedRole) {
          toast.error("Login succeeded, but your account has no assigned role!");
          setLoading(false);
          return;
        }

        // 🛡️ VAPT: Save CSRF Token to SessionStorage (memory specific to this browser tab)
        if (data.csrfToken) {
           sessionStorage.setItem("csrfToken", data.csrfToken);
        } else {
           console.error("Missing CSRF Token in Backend Response!");
        }

        // Save Non-Sensitive Metadata for UI rendering
        localStorage.setItem("userRole", extractedRole); 
        localStorage.setItem("role", extractedRole); 
        localStorage.setItem("userName", data.user?.name || ""); 
        localStorage.setItem("organizationId", data.user?.organizationId || ""); 
        
        // 🧹 Ensure NO TOKEN is saved to localStorage!
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");

        toast.success(`Welcome back, ${data.user?.name || data.user?.email}!`, {
          position: "top-right",
          autoClose: 1500,
        });

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);

      } else {
        toast.error(data.error || "Invalid credentials", { position: "top-right" });
      }
    } catch (error) {
      console.error("LOGIN FETCH ERROR:", error);
      toast.error("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container p-4 shadow-lg rounded bg-white">
      <ToastContainer />
      <div className="text-center mb-4">
        <h2 className="text-primary fw-bold">WBES System Login</h2>
        <p className="text-muted">Sign in to manage IP Whitelisting requests</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-3">
          <label className="form-label fw-medium">Email Address</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Enter your email" 
            className="form-control" 
            required 
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-medium">Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Enter your password" 
            className="form-control" 
            required 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="btn btn-primary w-100 py-2 d-flex align-items-center justify-content-center"
        >
          {loading ? <><Spinner size="sm" className="me-2" /> Processing...</> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;