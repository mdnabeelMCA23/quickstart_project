import { useEffect, useState } from "react";
import { getTasks, createTask, deleteTask, updateTaskStatus, updateTask } from "../services/api";
import { jwtDecode } from "jwt-decode";

// ------------------ Style Definitions ------------------
const styles = {
  container: {
    padding: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: "#1e293b",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  header: {
    fontSize: "2rem",
    fontWeight: 600,
    marginBottom: "2rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "0.75rem",
    color: "#0f172a",
  },
  formCard: {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "16px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    marginBottom: "2rem",
    border: "1px solid #edf2f7",
  },
  formTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "1.25rem",
    color: "#0f172a",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "1rem",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
  },
  inputFocus: {
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 3px rgba(59,130,246,0.1)",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "1rem",
    fontFamily: "inherit",
    resize: "vertical",
    minHeight: "80px",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    outline: "none",
    boxSizing: "border-box",
    backgroundColor: "#ffffff",
  },
  select: {
    padding: "0.75rem 2rem 0.75rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "1rem",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234b5563' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    backgroundSize: "1rem",
  },
  dateInput: {
    padding: "0.75rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "1rem",
    fontFamily: "inherit",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    outline: "none",
    backgroundColor: "#ffffff",
  },
  buttonPrimary: {
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.15s ease, transform 0.1s ease",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  buttonSecondary: {
    backgroundColor: "#f1f5f9",
    color: "#1e293b",
    border: "1px solid #e2e8f0",
    padding: "0.75rem 1.5rem",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  buttonDanger: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  buttonWarning: {
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  buttonGroup: {
    display: "flex",
    gap: "0.75rem",
    flexWrap: "wrap",
    marginTop: "1rem",
  },
  filterBar: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
  },
  searchInput: {
    flex: 1,
    minWidth: "250px",
    padding: "0.75rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "40px",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
    backgroundColor: "#ffffff",
  },
  filterSelect: {
    padding: "0.75rem 2rem 0.75rem 1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "40px",
    fontSize: "1rem",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    outline: "none",
    appearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%234b5563' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    backgroundSize: "1rem",
  },
  taskCard: {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "20px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    marginBottom: "1rem",
    border: "1px solid #f1f5f9",
    transition: "box-shadow 0.2s ease, transform 0.1s ease",
  },
  taskHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem",
  },
  taskTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    margin: 0,
  },
  priorityBadge: (priority) => ({
    padding: "0.25rem 0.75rem",
    borderRadius: "40px",
    fontSize: "0.75rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    backgroundColor:
      priority === "High" ? "#fee2e2" : priority === "Medium" ? "#fef3c7" : "#dcfce7",
    color:
      priority === "High" ? "#b91c1c" : priority === "Medium" ? "#b45309" : "#166534",
  }),
  taskDescription: {
    color: "#475569",
    lineHeight: 1.6,
    marginBottom: "1rem",
  },
  taskMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1rem",
    fontSize: "0.875rem",
    color: "#64748b",
  },
  taskActions: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    marginTop: "1rem",
  },
  actionButton: {
    padding: "0.5rem 1rem",
    borderRadius: "30px",
    fontSize: "0.875rem",
    fontWeight: 500,
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.15s ease",
  },
  emptyState: {
    textAlign: "center",
    padding: "4rem 2rem",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    color: "#94a3b8",
    border: "2px dashed #e2e8f0",
  },
};

// ------------------ Component ------------------
export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTask = async () => {
    if (!form.title) return alert("Title required");

    if (editingTask) {
      await updateTask(editingTask._id, form);
      setEditingTask(null);
    } else {
      await createTask(form);
    }

    setForm({ title: "", description: "", priority: "Low", dueDate: "" });
    loadTasks();
  };

  const removeTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await deleteTask(id);
    loadTasks();
  };

  const changeStatus = async (id, status) => {
    await updateTaskStatus(id, status);
    loadTasks();
  };

  const editTask = (task) => {
    setEditingTask(task);
    setForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate?.substring(0, 10) || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredTasks = tasks
    .filter((t) => !filterStatus || t.status === filterStatus)
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        <span>📋</span> Task Manager
      </h2>

      {/* Create / Edit Task Form */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>{editingTask ? "Edit Task" : "Create New Task"}</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={styles.input}
            onFocus={(e) => (e.currentTarget.style.borderColor = styles.inputFocus.borderColor)}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
          />

          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={styles.textarea}
          />

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <select
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              style={styles.select}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
              style={styles.dateInput}
            />
          </div>

          <div style={styles.buttonGroup}>
            <button
              onClick={saveTask}
              style={styles.buttonPrimary}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
            >
              {editingTask ? "Update Task" : "Add Task"}
            </button>

            {editingTask && (
              <button
                onClick={() => {
                  setEditingTask(null);
                  setForm({ title: "", description: "", priority: "Low", dueDate: "" });
                }}
                style={styles.buttonSecondary}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e2e8f0")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div style={styles.filterBar}>
        <input
          placeholder="🔍 Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={styles.filterSelect}
        >
          <option value="">All statuses</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Task List */}
      {filteredTasks.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 500, marginBottom: "0.5rem" }}>
            No tasks found
          </h3>
          <p style={{ color: "#94a3b8" }}>Create your first task to get started</p>
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task._id}
            style={styles.taskCard}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0,0,0,0.1)")}
          >
            <div style={styles.taskHeader}>
              <h3
                style={{
                  ...styles.taskTitle,
                  textDecoration: task.status === "Completed" ? "line-through" : "none",
                  color: task.status === "Completed" ? "#94a3b8" : "#0f172a",
                }}
              >
                {task.title}
              </h3>
              <span style={styles.priorityBadge(task.priority)}>{task.priority}</span>
            </div>

            {task.description && <p style={styles.taskDescription}>{task.description}</p>}

            <div style={styles.taskMeta}>
              <span>📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No due date"}</span>
              <span>📍 {task.status || "Todo"}</span>
            </div>

            <div style={styles.taskActions}>
              {task.status !== "In Progress" && task.status !== "Completed" && (
                <button
                  onClick={() => changeStatus(task._id, "In Progress")}
                  style={{ ...styles.actionButton, backgroundColor: "#f1f5f9", color: "#1e293b" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e2e8f0")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
                >
                  Start
                </button>
              )}
              {task.status !== "Completed" && (
                <button
                  onClick={() => changeStatus(task._id, "Completed")}
                  style={{ ...styles.actionButton, backgroundColor: "#22c55e", color: "white" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#22c55e")}
                >
                  Complete
                </button>
              )}
              <button
                onClick={() => editTask(task)}
                style={{ ...styles.actionButton, backgroundColor: "#f59e0b", color: "white" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d97706")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#f59e0b")}
              >
                Edit
              </button>
              <button
                onClick={() => removeTask(task._id)}
                style={{ ...styles.actionButton, backgroundColor: "#ef4444", color: "white" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ef4444")}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}