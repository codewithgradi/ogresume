import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const page = () => {
  return (
<div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
  <div className="space-y-6 w-full max-w-md p-6 bg-white rounded-2xl shadow-lg text-center">
    <h1 className="font-bold text-3xl">OG Resume Build</h1>
    <p className="text-sm text-gray-700">
      Unlock your career potential with our ATS-compliant resume builder—designed
      to make sure your skills, experience, and achievements shine both to recruiters
      and the software that screens resumes. Say goodbye to formatting headaches
      and rejected applications: our builder formats your CV in a way that is fully
      optimized for applicant tracking systems, ensuring your resume gets noticed
      by hiring managers. With a live preview, easy-to-use interface, and one-click
      download, you can create a professional, polished resume in minutes.
    </p>
        <Button>
          <Link href='/build'>Get Started</Link>
    </Button>
  </div>
</div>

  )
}

export default page
