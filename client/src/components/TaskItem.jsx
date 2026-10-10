export default function TaskItem({ task, onEdit, onDelete, onStatus }) {
  // highlight tasks that are past their due date and not finished yet
  const overdue = task.dueDate && task.status !== 'done' && new Date(task.dueDate) < new Date();

  return (
    <div className={`card task ${task.status === 'done' ? 'done' : ''}`}>
      <div className="task-head">
        <h4>{task.title}</h4>
        <span className={`badge ${task.priority}`}>{task.priority}</span>
      </div>
      {task.description && <p className="muted">{task.description}</p>}
      {task.dueDate && (
        <p className={overdue ? 'overdue' : 'muted'}>
          Due {new Date(task.dueDate).toLocaleDateString()} {overdue && '(overdue)'}
        </p>
      )}
      <div className="row">
        <select value={task.status} onChange={(e) => onStatus(task, e.target.value)}>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
        <button className="ghost" onClick={() => onEdit(task)}>Edit</button>
        <button className="danger" onClick={() => onDelete(task._id)}>Delete</button>
      </div>
    </div>
  );
}
