import { AlertCircle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const colors = {
    danger: { bg: '#EF4444', icon: 'text-red-600' },
    warning: { bg: '#D65A1E', icon: 'text-orange-600' },
    info: { bg: '#3B82F6', icon: 'text-blue-600' }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className={`p-3 rounded-xl ${type === 'danger' ? 'bg-red-100' : type === 'warning' ? 'bg-orange-100' : 'bg-blue-100'}`}>
              <AlertCircle className={`w-6 h-6 ${colors[type].icon}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600">{message}</p>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 text-white rounded-xl hover:shadow-lg transition-all"
              style={{ backgroundColor: colors[type].bg }}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
