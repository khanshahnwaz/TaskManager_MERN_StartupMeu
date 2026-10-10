import { useEffect, useState, useCallback } from 'react';
import { api } from '../api';
import { useAuth } from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [editing, setEditing] = useState(null); // the task being edited, if any
  const [error, setError] = useState('');

  // Rebuild the query string whenever a filter changes
  const loadTasks = useCallback(async () => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => v && params.append(k, v));
    try {
      setTasks(await api(`/tasks?${params}`));
      setError('');
    } catch (err) {
      setError(err.message);
    }
  }, [filters]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const saveTask = async (data) => {
    if (editing) {
      const updated = await api(`/tasks/${editing._id}`, { method: 'PUT', body: data });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setEditing(null);
    } else {
      const created = await api('/tasks', { method: 'POST', body: data });
      setTasks((prev) => [created, ...prev]);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api(`/tasks/${id}`, { method: 'DELETE' });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Quick status change straight from the card
  const changeStatus = async (task, status) => {
    try {
      const updated = await api(`/tasks/${task._id}`, { method: 'PUT', body: { status } });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  };

  const counts = {
    todo: tasks.filter((t) => t.status === 'todo').length,
    progress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length
  };

  return (
    <div className="container">
      <header className="topbar">
        <h1>TaskFlow</h1>
        <div>
          <span className="muted">Hi, {user.name}</span>
          <button className="ghost" onClick={logout}>Logout</button>
        </div>
      </header>

      <div className="stats">
        <div className="card"><b>{counts.todo}</b> To do</div>
        <div className="card"><b>{counts.progress}</b> In progress</div>
        <div className="card"><b>{counts.done}</b> Done</div>
      </div>

      <TaskForm key={editing?._id || 'new'} initial={editing} onSave={saveTask} onCancel={() => setEditing(null)} />

      <div className="filters">
        <input placeholder="Search title..." value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All statuses</option>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <select value={filters.priority} onChange={(e) => setFilters({ ...filters, priority: e.target.value })}>
          <option value="">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="task-list">
        {tasks.length === 0 && <p className="muted center">No tasks yet. Add one above!</p>}
        {tasks.map((t) => (
          <TaskItem key={t._id} task={t} onEdit={setEditing} onDelete={deleteTask} onStatus={changeStatus} />
        ))}
      </div>
    </div>
  );
}
