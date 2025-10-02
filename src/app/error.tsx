'use client'

import React from 'react'
import Link from 'next/link'

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-red-600 mb-4">Oops!</h1>
      <p className="text-xl text-red-700 mb-6">An error occurred while loading this page.</p>
      <Link
        href="/"
        className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  )
}

export default ErrorPage
