import './EmptyState.scss';
import type { EmptyStateProps } from '../../../types/props';

export default function EmptyState({ message = 'No items found.', imageSrc }: EmptyStateProps) {
  return (
    <div className="empty-state">
      {imageSrc && <img src={imageSrc} alt="Empty state" />}
      <p>{message}</p>
    </div>
  );
}
