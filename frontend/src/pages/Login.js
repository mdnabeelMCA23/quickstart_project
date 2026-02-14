import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg,#667eea,#764ba2)",
      fontFamily: "Arial, Helvetica, sans-serif"
    },
    card: {
      background: "white",
      padding: "40px",
      width: "350px",
      borderRadius: "14px",
      boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
      textAlign: "center"
    },
    title: {
      marginBottom: "25px",
      color: "#333"
    },
    input: {
      width: "100%",
      padding: "12px",
      marginBottom: "15px",
      borderRadius: "8px",
      border: "1px solid #ddd",
      outline: "none",
      fontSize: "14px"
    },
    button: {
      width: "100%",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      background: "#667eea",
      color: "white",
      fontSize: "16px",
      cursor: "pointer"
    },
    registerText: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#666"
    },
    registerLink: {
      color: "#667eea",
      cursor: "pointer",
      fontWeight: "bold",
      marginLeft: "5px"
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            placeholder="Email Address"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <button style={styles.button} type="submit">
            Login
          </button>
        </form>

        <p style={styles.registerText}>
          Don't have an account?
          <span style={styles.registerLink} onClick={() => navigate("/register")}>
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}
