'use client'

import { api } from '@/lib/api'
import Cookie from 'js-cookie'

import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface MemoryProps {
  coverUrl: string
  content: string
  id: string
  createdAt: string
}

export function MemoryDetails({ idMemory }: { idMemory: string }) {
  const token = Cookie.get('token')
  const [memory, setMemory] = useState<MemoryProps[]>([])
  const router = useRouter()

  async function MemoryLoad() {
    const response = await api.get(`/memories/${idMemory}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    setMemory(response.data)
  }

  useEffect(() => {
    MemoryLoad()
  }, [])

  async function MemoryRemove() {
    await api.delete(`/memories/${idMemory}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    router.push('/')
  }
  if (memory.length === 0) {
    return <h1>Caregando ...</h1>
  }

  const memoryItem = memory[0]
  return (
    <>
      <div className="flex flex-col gap-10 p-8">
        <div key={memoryItem.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50 ">
            {dayjs(memoryItem.createdAt).format('D [ de ]MMMM[, ] YYYY')}
          </time>
        </div>
        <Image
          className="aspect-video w-full object-cover object-cover "
          src={memoryItem.coverUrl}
          width={592}
          height={280}
          alt=""
        />
        <p className="text-lg leading-relaxed text-gray-100">
          {memoryItem.content}
        </p>
        <button
          onClick={MemoryRemove}
          className="inline-block self-end rounded-full bg-red-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
        >
          Remover
        </button>
      </div>
    </>
  )
}
