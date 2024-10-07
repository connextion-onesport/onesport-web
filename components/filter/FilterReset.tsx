import React from 'react'
import { Button } from '../ui/button'
import { PiBackspace } from 'react-icons/pi'
import { useRouter } from 'next/navigation'

export default function FilterReset() {
  const router = useRouter()

  const handleReset = () => {
    router.push('/venues')
  }

  return (
    <Button
      variant="outline"
      onClick={handleReset}
      className="h-8 rounded-full px-3 text-xs text-muted-foreground md:h-9 md:px-4 md:py-2 md:text-sm"
    >
      <PiBackspace className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
      Reset
    </Button>
  )
}
