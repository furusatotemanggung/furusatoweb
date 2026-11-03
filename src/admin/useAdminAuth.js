import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

// Status login admin dari Firebase Auth: { user, loading }.
// user === null berarti belum login; loading true selama status awal dimuat.
export function useAdminAuth() {
  const [state, setState] = useState({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setState({ user, loading: false });
    });
    return unsubscribe;
  }, []);

  return state;
}
