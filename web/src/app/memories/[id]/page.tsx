import { MemoryDetails } from '@/components/MemoryDetails'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

interface Params {
  id: string
}
export default function Memory({ params }: { params: Params }) {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar à timeline
      </Link>
      <MemoryDetails idMemory={params.id} />
    </div>
  )
}
