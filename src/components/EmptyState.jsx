import { Icon } from './Icon.jsx';

export function EmptyState({ title, message, actionLabel, onAction, icon = 'folder' }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon"><Icon name={icon} size={22} /></span>
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button className="text-action" type="button" onClick={onAction}>{actionLabel}</button>
      )}
    </div>
  );
}
