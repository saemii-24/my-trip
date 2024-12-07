import React from 'react';

type User = {
  id: string; // UUID 형식
  firstName: string; // 이름
  lastName: string; // 성
};

async function getUser(): Promise<User> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/test`, {
    cache: 'no-store',
  }); // 캐싱 방지
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

const Page = async () => {
  const user = await getUser();

  return (
    <div>
      <h1>User Information</h1>
      <p>ID: {user.id}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
    </div>
  );
};

export default Page;
