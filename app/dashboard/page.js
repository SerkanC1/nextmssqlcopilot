// app/dashboard/page.js
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const username = localStorage.getItem('username');
      if (!username) {
        router.push('/');
        return;
      }

      const res = await fetch(`/api/user?username=${username}`);
      const data = await res.json();

      if (res.ok) {
        setUser(data);
      } else {
        console.error('Failed to fetch user:', data);
        router.push('/');
      }
    };

    fetchUser();
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>Name: {user.NameSurname}</p>
      <p>Username: {user.UserName}</p>
      <p>Last Active: {new Date(user.LastActive).toLocaleString()}</p>
      {/* Diğer kullanıcı bilgilerini burada gösterebilirsiniz */}
    </div>
  );
}