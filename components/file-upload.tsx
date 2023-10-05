'use client'

import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing'
import Image from 'next/image'
import { X } from 'lucide-react'

interface FileUploadProps {
  value: string
  onChange: (url?: string) => void
  endpoint: 'serverImage' | 'messageFile'
}

const FileUpload: React.FC<FileUploadProps> = ({
  value,
  endpoint,
  onChange
}) => {
  const fileType = value.split('.').pop()
  if (value && fileType !== 'pdf') {
    return (
      <div className='w-20 h-20 relative'>
        <Image src={value} fill alt='Upload' className='rounded-full' />
        <button
          type='button'
          className='bg-rose-500 absolute top-0 right-0 p-1 text-white shadow-sm rounded-full'
          onClick={() => onChange('')}
        >
          <X className='w-4 h-4' />
        </button>
      </div>
    )
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url)
      }}
      onUploadError={(error: Error) => {
        console.log(error, 'error')
      }}
    />
  )
}

export default FileUpload
