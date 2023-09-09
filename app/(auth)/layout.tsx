import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen flex flex-col items-center justify-center bg-primary'>
      <div className='mb-6 font-bold text-5xl text-orange-600 italic'>
        Discord-<span className='text-green-600'>C</span>
      </div>
      {children}
    </div>
  )
}

export default AuthLayout
