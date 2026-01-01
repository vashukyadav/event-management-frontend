import toast from 'react-hot-toast';

// Custom toast configurations
export const showToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      duration: 4000,
      style: {
        background: '#f0fdf4',
        color: '#166534',
        border: '1px solid #22c55e',
        borderRadius: '12px',
        padding: '16px 20px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(34, 197, 94, 0.1)',
        ...options.style
      },
      iconTheme: {
        primary: '#22c55e',
        secondary: '#fff'
      },
      ...options
    });
  },

  error: (message, options = {}) => {
    return toast.error(message, {
      duration: 5000,
      style: {
        background: '#fef2f2',
        color: '#dc2626',
        border: '1px solid #ef4444',
        borderRadius: '12px',
        padding: '16px 20px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(239, 68, 68, 0.1)',
        ...options.style
      },
      iconTheme: {
        primary: '#ef4444',
        secondary: '#fff'
      },
      ...options
    });
  },

  loading: (message, options = {}) => {
    return toast.loading(message, {
      style: {
        background: '#eff6ff',
        color: '#1d4ed8',
        border: '1px solid #3b82f6',
        borderRadius: '12px',
        padding: '16px 20px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(59, 130, 246, 0.1)',
        ...options.style
      },
      iconTheme: {
        primary: '#3b82f6',
        secondary: '#fff'
      },
      ...options
    });
  },

  promise: (promise, messages, options = {}) => {
    return toast.promise(promise, messages, {
      style: {
        borderRadius: '12px',
        padding: '16px 20px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      },
      success: {
        style: {
          background: '#f0fdf4',
          color: '#166534',
          border: '1px solid #22c55e',
        },
        iconTheme: {
          primary: '#22c55e',
          secondary: '#fff'
        }
      },
      error: {
        style: {
          background: '#fef2f2',
          color: '#dc2626',
          border: '1px solid #ef4444',
        },
        iconTheme: {
          primary: '#ef4444',
          secondary: '#fff'
        }
      },
      loading: {
        style: {
          background: '#eff6ff',
          color: '#1d4ed8',
          border: '1px solid #3b82f6',
        },
        iconTheme: {
          primary: '#3b82f6',
          secondary: '#fff'
        }
      },
      ...options
    });
  },

  custom: (message, options = {}) => {
    return toast(message, {
      duration: 4000,
      style: {
        background: '#fff',
        color: '#374151',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        padding: '16px 20px',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        ...options.style
      },
      ...options
    });
  }
};

// Quick access methods
export const successToast = showToast.success;
export const errorToast = showToast.error;
export const loadingToast = showToast.loading;
export const promiseToast = showToast.promise;
export const customToast = showToast.custom;

export default showToast;