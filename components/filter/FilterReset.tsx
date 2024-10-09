import React, { use } from 'react'
import { Button } from '../ui/button'
import { PiBackspace } from 'react-icons/pi'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function FilterReset() {
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const {replace} = useRouter()

  const handleReset = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('order')
    params.delete('category')
    params.delete('min_price')
    params.delete('max_price')
    params.delete('rating')
    params.delete('search')

    replace(`${pathName}?${params.toString()}`)
  }

  return (
    <Button
      variant="outline"
      onClick={handleReset}
      className="rounded-full text-muted-foreground h-9 px-4 py-2 text-sm"
    >
      <PiBackspace className="mr-2 h-4 w-4" />
      Reset
    </Button>
  )
}
