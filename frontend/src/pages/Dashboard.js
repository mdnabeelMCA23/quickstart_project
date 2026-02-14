import { useEffect, useState } from "react";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // ----- Styles (professional, modern) -----
  const theme = {
    primary: "#667eea",
    secondary: "#764ba2",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    cardBg: "#ffffff",
    textPrimary: "#1e293b",
    textSecondary: "#64748b",
    border: "#e2e8f0",
    shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: theme.background,
      padding: "2rem",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: theme.textPrimary,
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2.5rem",
      flexWrap: "wrap",
      gap: "1rem",
    },
    title: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "white",
      letterSpacing: "-0.025em",
      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    buttonGroup: {
      display: "flex",
      gap: "0.75rem",
    },
    button: {
      padding: "0.6rem 1.25rem",
      borderRadius: "9999px",
      border: "none",
      fontWeight: 600,
      fontSize: "0.9rem",
      cursor: "pointer",
      transition: "all 0.15s ease",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    buttonPrimary: {
      backgroundColor: "white",
      color: theme.primary,
    },
    buttonDanger: {
      backgroundColor: theme.danger,
      color: "white",
    },
    cardsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2.5rem",
    },
    card: {
      background: theme.cardBg,
      borderRadius: "1.5rem",
      padding: "1.5rem",
      boxShadow: theme.shadow,
      transition: "transform 0.15s ease, box-shadow 0.15s ease",
      border: `1px solid ${theme.border}`,
    },
    cardTitle: {
      fontSize: "0.9rem",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: theme.textSecondary,
      marginBottom: "0.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    cardValue: {
      fontSize: "2.2rem",
      fontWeight: 700,
      color: theme.textPrimary,
      lineHeight: 1.2,
    },
    cardFooter: {
      fontSize: "0.85rem",
      color: theme.textSecondary,
      marginTop: "0.5rem",
    },
    chartsRow: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2.5rem",
    },
    chartCard: {
      background: theme.cardBg,
      borderRadius: "1.5rem",
      padding: "1.5rem",
      boxShadow: theme.shadow,
      border: `1px solid ${theme.border}`,
    },
    chartTitle: {
      fontSize: "1.2rem",
      fontWeight: 600,
      marginBottom: "1rem",
      color: theme.textPrimary,
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
    },
    loadingContainer: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: theme.background,
    },
    loadingSkeleton: {
      width: "80%",
      maxWidth: "400px",
      background: "rgba(255,255,255,0.2)",
      borderRadius: "1rem",
      padding: "2rem",
      backdropFilter: "blur(10px)",
      color: "white",
      textAlign: "center",
    },
    errorContainer: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: theme.background,
      color: "white",
      textAlign: "center",
      flexDirection: "column",
      gap: "1rem",
    },
  };

  // ----- Handlers -----
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToTasks = () => {
    navigate("/tasks");
  };

  // ----- Data Fetching -----
  const fetchStats = async () => {
    try {
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/");
        return;
      }

      const decoded = jwtDecode(token);
      const userId = decoded.id || decoded._id;

      const res = await API.get(`/analytics/stats/${userId}`);
      setStats(res.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to load analytics. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ----- Loading & Error States -----
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSkeleton}>
          <div style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>📊</div>
          <div style={{ height: "8px", background: "rgba(255,255,255,0.3)", borderRadius: "4px", marginBottom: "1rem" }} />
          <div style={{ height: "8px", background: "rgba(255,255,255,0.3)", borderRadius: "4px", width: "80%", margin: "0 auto" }} />
          <p style={{ marginTop: "1rem" }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div style={styles.errorContainer}>
        <div style={{ fontSize: "3rem" }}>⚠️</div>
        <h2>{error || "No data available"}</h2>
        <button
          onClick={fetchStats}
          style={{ ...styles.button, ...styles.buttonPrimary, padding: "0.75rem 2rem" }}
        >
          Retry
        </button>
      </div>
    );
  }

  // ----- Prepare data for charts -----
  const weekly = stats.weekly_data || [];

  const weeklyChartData = {
    labels: weekly.map((item) => item.date),
    datasets: [
      {
        label: "Tasks Completed",
        data: weekly.map((item) => item.count),
        backgroundColor: "rgba(102, 126, 234, 0.7)",
        borderRadius: 8,
      },
    ],
  };

  const priorityData = stats.priority_distribution || { Low: 0, Medium: 0, High: 0 };
  const priorityChartData = {
    labels: ["Low", "Medium", "High"],
    datasets: [
      {
        data: [priorityData.Low || 0, priorityData.Medium || 0, priorityData.High || 0],
        backgroundColor: ["#10b981", "#f59e0b", "#ef4444"],
        borderWidth: 0,
      },
    ],
  };

  const statusData = stats.status_distribution || { Todo: 0, "In Progress": 0, Completed: 0 };
  const statusChartData = {
    labels: ["Todo", "In Progress", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [
          statusData.Todo || 0,
          statusData["In Progress"] || 0,
          statusData.Completed || 0,
        ],
        backgroundColor: ["#94a3b8", "#3b82f6", "#10b981"],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: theme.textPrimary, titleColor: "white", bodyColor: "white" },
    },
    scales: {
      y: { beginAtZero: true, grid: { color: "#e2e8f0" } },
      x: { grid: { display: false } },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8 } },
    },
    cutout: "65%",
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>📈 Task Analytics Dashboard</h1>
        <div style={styles.buttonGroup}>
          <button
            style={{ ...styles.button, ...styles.buttonPrimary }}
            onClick={goToTasks}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
          >
            Task Manager
          </button>
          <button
            style={{ ...styles.button, ...styles.buttonDanger }}
            onClick={logout}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = theme.danger)}
          >
            Logout
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={styles.cardsGrid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>📋 Total Tasks</div>
          <div style={styles.cardValue}>{stats.total_tasks}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>✅ Completed</div>
          <div style={styles.cardValue}>{stats.completed_tasks}</div>
          <div style={styles.cardFooter}>
            {stats.completion_rate}% completion rate
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>⏳ Pending</div>
          <div style={styles.cardValue}>{stats.pending_tasks}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>⚠️ Overdue</div>
          <div style={styles.cardValue}>{stats.overdue_tasks || 0}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>🔴 High Priority</div>
          <div style={styles.cardValue}>{priorityData.High || 0}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>🟡 Medium Priority</div>
          <div style={styles.cardValue}>{priorityData.Medium || 0}</div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>🟢 Low Priority</div>
          <div style={styles.cardValue}>{priorityData.Low || 0}</div>
        </div>
      </div>

      {/* Charts Row (Priority & Status) */}
      <div style={styles.chartsRow}>
        {/* Priority Distribution */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <span>🎯</span> Priority Distribution
          </h3>
          <div style={{ height: "250px" }}>
            {priorityData.Low || priorityData.Medium || priorityData.High ? (
              <Doughnut data={priorityChartData} options={doughnutOptions} />
            ) : (
              <p style={{ color: theme.textSecondary, textAlign: "center", marginTop: "4rem" }}>
                No tasks by priority
              </p>
            )}
          </div>
        </div>

        {/* Status Distribution */}
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>
            <span>📌</span> Status Breakdown
          </h3>
          <div style={{ height: "250px" }}>
            {statusData.Todo || statusData["In Progress"] || statusData.Completed ? (
              <Bar data={statusChartData} options={chartOptions} />
            ) : (
              <p style={{ color: theme.textSecondary, textAlign: "center", marginTop: "4rem" }}>
                No tasks by status
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Weekly Productivity Chart */}
      <div style={styles.chartCard}>
        <h3 style={styles.chartTitle}>
          <span>📊</span> Weekly Productivity
        </h3>
        <div style={{ height: "300px" }}>
          {weekly.length > 0 ? (
            <Bar data={weeklyChartData} options={chartOptions} />
          ) : (
            <p style={{ color: theme.textSecondary, textAlign: "center", marginTop: "4rem" }}>
              No completed tasks this week yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}