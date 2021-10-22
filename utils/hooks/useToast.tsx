import toast from 'react-hot-toast';

interface notifyParams {
  state: 'success' | 'error';
  message: string;
}

export default function useToast() {
  function notify({ state, message }: notifyParams) {
    toast(message, {
      duration: 7000,
      position: 'top-center',
      // Styling
      style: {
        backgroundColor: '#222',
        color: '#aaa',
        padding: '1.25rem 0.75rem',
        fontSize: '1.125rem',
      },
      // Custom Icon
      icon: state === 'success' ? '✅' : '❌',
      // Change colors of success/error/loading icon
      //   iconTheme: {
      //     primary: '#aaa',
      //     secondary: '#171717',
      //   },
      // Aria
      ariaProps: {
        role: 'status',
        'aria-live': 'polite',
      },
    });
  }

  return { notify };
}
