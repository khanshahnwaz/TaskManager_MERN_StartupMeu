import { useState } from 'react';

const empty = { title: '', description: '', priority: 'medium', status: 'todo', dueDate: '' };

export default function TaskForm({ initial, onSave, onCancel }) {
  // When editing, prefill the form. Dates need the yyyy-mm-dd format for the input.
  const [form, setForm] = useState(
    initial ? { ...initial, dueDate: initial.dueDate ? initial.dueDate.slice(0, 10) : '' } : empty
  );
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onSave(form);
      if (!initial) setForm(empty); // clear the form after adding
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="card task-form" onSubmit={handleSubmit}>
      <h3>{initial ? 'Edit task' : 'New task'}</h3>
      {error && <div className="error">{error}</div>}
      <input name="title" placeholder="What needs doing?" value={form.title} onChange={handleChange} required maxLength={120} />
      <textarea name="description" placeholder="Details (optional)" value={form.description} onChange={handleChange} rows={2} />
      <div className="row">
        <select name="priority" value={form.priority} onChange={handleChange}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <select name="status" value={form.status} onChange={handleChange}>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} />
      </div>
      <div className="row" style={{ marginTop: 8 }}>
        <button>{initial ? 'Update' : 'Add task'}</button>
        {initial && <button type="button" className="ghost" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
