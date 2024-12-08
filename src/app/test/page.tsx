import React from 'react';

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export default async function Page() {
  // User 정보를 가져오는 컴포넌트
  async function getUser(): Promise<User> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/test`, {
      cache: 'no-store',
    });
    console.log(response);
    return response.json();
  }

  const user = await getUser();

  return (
    <div>
      <h1>User Information</h1>
      <p>ID: {user.id}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
    </div>
  );
}
