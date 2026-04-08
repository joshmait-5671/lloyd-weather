'use client'

import { Chapter } from '@/types'

interface ChapterSelectProps {
  chapters: Chapter[]
  onSelect: (chapter: Chapter) => void
}

export default function ChapterSelect({ chapters, onSelect }: ChapterSelectProps) {
  return (
    <div className="flex flex-col min-h-dvh bg-[#0a0424] px-5 pt-12 pb-8">
      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-pav-pink mb-3">
          Pavilion · Chapter DNA
        </p>
        <h1 className="text-[32px] sm:text-[38px] font-display font-bold text-white leading-[1.08] tracking-tight mb-4">
          Same network.
          <br />
          Different DNA.
        </h1>
        <p className="text-[15px] text-white/40 leading-relaxed">
          Pick your chapter. 10 questions. Under 3 minutes.
        </p>
      </div>

      {/* City photo grid */}
      <div className="grid grid-cols-2 gap-2.5 flex-1">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => onSelect(chapter)}
            className="group relative overflow-hidden rounded-xl min-h-[120px] active:scale-[0.97] transition-transform duration-150"
            style={{
              backgroundImage: chapter.cityPhoto ? `url(${chapter.cityPhoto})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundColor: '#2B1887',
            }}
          >
            {/* Dark gradient overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-200"
              style={{
                background:
                  'linear-gradient(to top, rgba(10,4,36,0.88) 0%, rgba(10,4,36,0.35) 50%, rgba(10,4,36,0.15) 100%)',
              }}
            />

            {/* Hover brighten */}
            <div className="absolute inset-0 bg-pav-pink/0 group-hover:bg-pav-pink/10 transition-colors duration-200" />

            {/* City name */}
            <div className="absolute bottom-0 left-0 right-0 px-3 pb-3">
              <p className="text-[15px] font-display font-bold text-white leading-tight text-left">
                {chapter.name}
              </p>
            </div>

            {/* Arrow on hover */}
            <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-white/50 text-sm">→</span>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom hint */}
      <p className="text-center text-[12px] text-white/20 mt-6">
        No right answers. Just your chapter&apos;s true personality.
      </p>
    </div>
  )
}
