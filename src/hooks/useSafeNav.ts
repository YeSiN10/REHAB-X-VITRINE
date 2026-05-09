import { useNavigate, useLocation } from 'react-router-dom';

type SafeNavigate = (to: string | number, opts?: { replace?: boolean }) => void;

export function useSafeNavigate(): SafeNavigate {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    return navigate as SafeNavigate;
  } catch {
    return (to: string | number) => {
      if (typeof to === 'string') {
        window.location.href = to;
      } else {
        window.history.go(to);
      }
    };
  }
}

export function useSafeLocation() {
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useLocation();
  } catch {
    return {
      pathname: typeof window !== 'undefined' ? window.location.pathname : '/',
      search: '',
      hash: '',
      state: null,
      key: 'default',
    };
  }
}
