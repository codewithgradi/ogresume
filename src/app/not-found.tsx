'use client'

import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default NotFound
