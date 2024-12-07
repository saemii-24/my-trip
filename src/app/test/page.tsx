import React from 'react';

const page = () => {
  async function app() {
    const response = await fetch('https://example.com/user');
    const user = await response.json();
    console.log(user);
  }

  app();
  return <div>page</div>;
};

export default page;
