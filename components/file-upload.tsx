'use client'

import React from 'react'
import { UploadDropzone } from '@/lib/uploadthing'
import Image from 'next/image'
import { FileIcon, X } from 'lucide-react'

interface FileUploadProps {
  value: string
  onChange: (url?: string) => void
  endpoint: 'serverImage' | 'messageFile'
}

const FileUpload: React.FC<FileUploadProps> = ({
  value,
  endpoint,
  onChange,
}) => {
  const fileType = value.split('.').pop()
  if (value && fileType !== 'pdf') {
    return (
      <div className='relative h-20 w-20'>
        <Image src={value} fill alt='Upload' className='rounded-full' />
        <button
          type='button'
          className='absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm'
          onClick={() => onChange('')}
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    )
  }

  if (value && fileType === 'pdf') {
    return (
      <div className='relative m-3 flex items-center rounded-md bg-background/10 p-2'>
        <FileIcon className='h-10 w-10 fill-indigo-200 stroke-indigo-400' />
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='ml-2 text-sm text-indigo-500 hover:underline dark:text-indigo-400'
        >
          {value}
        </a>
        <button
          onClick={() => onChange('')}
          className='absolute -right-2 -top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm'
          type='button'
        >
          <X className='h-4 w-4' />
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
