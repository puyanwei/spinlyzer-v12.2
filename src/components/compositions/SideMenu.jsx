import React from 'react';
import Link from 'next/link';

export default function SideMenu() {
  return (
    <>
      <div>Welcome</div>
      <Link href='/api/auth/signout'>
        <a className='text-blue-400'>Sign Out</a>
      </Link>
    </>
  );
}
