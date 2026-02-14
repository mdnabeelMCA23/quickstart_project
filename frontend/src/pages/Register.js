import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
    link: {
      marginTop: "15px",
      color: "#667eea",
      cursor: "pointer",
      fontSize: "14px"
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

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
            Register
          </button>
        </form>

        <p style={styles.link} onClick={() => navigate("/")}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}
