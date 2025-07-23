'use client'

import Image from 'next/image'

const images = [
  "/hero/earing-1-MD.jpg", "/hero/earing-2-SD.jpg", "/hero/gem-1-SD.jpg", "/hero/necklace-1-HD.jpg", "/hero/necklace-1-SD.jpg", "/hero/ring-dark-bg-1-SD.jpg"
]

export default function Carousel() {
  return (
    <div className="overflow-hidden flex flex-col gap-10 py-20 bg-white">
      {[1, 2].map((rowIndex) => (
        <div
          key={rowIndex}
          className={`group flex overflow-hidden relative w-full`}
        >
          <div
            className={`flex min-w-full gap-10 animate-scroll ${rowIndex % 2 === 0 ? '' : 'animate-scroll-reverse'
              } group-hover:[animation-play-state:paused]`}
          >
            {[...images, ...images].map((src, i) => {
              return (
                <div key={i} className="shrink-0 w-96 aspect-square relative">
                  <Image
                    src={src}
                    alt={`carousel-img-${i}`}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}