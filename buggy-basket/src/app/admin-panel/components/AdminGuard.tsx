'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [authorised, setAuthorised] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      router.replace('/');
    } else {
      setAuthorised(true);
    }
    setChecking(false);
  }, [router]);

  if (checking) return null;
  if (!authorised) return null;

  return <>{children}</>;
}