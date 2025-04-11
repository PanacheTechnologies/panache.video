import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from './dialog.js'

interface ImagePreviewProps {
  image: {
    src: string
    alt: string
  }
  setHovered?: (hovered: boolean) => void
}

export function ImagePreview({ image, setHovered }: ImagePreviewProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      onMouseEnter={() => setHovered?.(true)}
      onMouseLeave={() => setHovered?.(false)}
    >
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger
          onClick={(e) => {
            e.preventDefault()
            setIsOpen(true)
            e.stopPropagation()
          }}
          asChild
        >
          <div className="cursor-pointer hover:opacity-80 transition-opacity duration-200">
            <img
              src={image.src || '/placeholder.svg'}
              alt={image.alt}
              className="rounded-lg my-2 w-auto max-h-96"
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-full bg-accent">
          <div className="relative">
            <img
              src={image.src || '/placeholder.svg'}
              alt={image.alt}
              width={1200}
              height={800}
              className="rounded-lg object-contain w-full h-full max-h-[80vh]"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
