'use client'

import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { ArchetypeResult } from '@/lib/archetype'
import { Chapter } from '@/types'
import jsPDF from 'jspdf'

interface ChapterCardProps {
  result: ArchetypeResult
  chapter: Chapter
  onRestart: () => void
}

function archetypeFontSize(name: string): string {
  const longest = Math.max(...name.split(' ').map(w => w.length))
  const px = Math.min(80, Math.floor(360 / (longest * 0.6)))
  return `${px}px`
}

function chapterFontSize(name: string): string {
  return name.length <= 10 ? '40px' : name.length <= 15 ? '32px' : '24px'
}

const Divider = () => (
  <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '18px 0' }} />
)

export default function ChapterCard({ result, chapter, onRestart }: ChapterCardProps) {
  const { archetype, drink, spot, says } = result
  const { name, tagline, description, traits, manifesto, moodPhoto } = archetype

  const page1Ref = useRef<HTMLDivElement>(null)
  const page2Ref = useRef<HTMLDivElement>(null)
  const [sharing, setSharing] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleDownloadPDF = async () => {
    if (!page1Ref.current || !page2Ref.current || exporting) return
    setExporting(true)
    try {
      const opts = { pixelRatio: 2, cacheBust: true }
      const [data1, data2] = await Promise.all([
        toPng(page1Ref.current, { ...opts, height: page1Ref.current.offsetHeight }),
        toPng(page2Ref.current, { ...opts, height: page2Ref.current.offsetHeight }),
      ])

      const w = page1Ref.current.offsetWidth
      const h = page1Ref.current.offsetHeight

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [w, h],
        hotfixes: ['px_scaling'],
      })

      pdf.addImage(data1, 'PNG', 0, 0, w, h)
      pdf.addPage([w, h], 'portrait')
      pdf.addImage(data2, 'PNG', 0, 0, w, h)

      pdf.save(`chapter-dna-${chapter.name.toLowerCase().replace(/\s+/g, '-')}.pdf`)
    } catch {
      // silent fail
    } finally {
      setExporting(false)
    }
  }

  const handleShare = async () => {
    if (!page1Ref.current || !page2Ref.current || sharing) return
    setSharing(true)

    try {
      const opts = { pixelRatio: 2, cacheBust: true }
      const [data1, data2] = await Promise.all([
        toPng(page1Ref.current, { ...opts, height: page1Ref.current.offsetHeight }),
        toPng(page2Ref.current, { ...opts, height: page2Ref.current.offsetHeight }),
      ])

      const toFile = (dataUrl: string, filename: string): File => {
        const arr = dataUrl.split(',')
        const mime = arr[0].match(/:(.*?);/)![1]
        const bstr = atob(arr[1])
        const u8arr = new Uint8Array(bstr.length)
        for (let i = 0; i < bstr.length; i++) u8arr[i] = bstr.charCodeAt(i)
        return new File([u8arr], filename, { type: mime })
      }

      const file1 = toFile(data1, 'chapter-dna-cover.png')
      const file2 = toFile(data2, 'chapter-dna-story.png')

      if (navigator.canShare && navigator.canShare({ files: [file1, file2] })) {
        // Mobile: native share sheet (Instagram, iMessage, etc.)
        await navigator.share({ files: [file1, file2], title: `${chapter.name} Chapter DNA` })
      } else {
        // Desktop: download both images
        const dl = (url: string, name: string) => {
          const a = document.createElement('a')
          a.href = url; a.download = name; a.click()
        }
        dl(data1, 'chapter-dna-cover.png')
        setTimeout(() => dl(data2, 'chapter-dna-story.png'), 300)
      }
    } catch {
      // User cancelled or capture failed
    } finally {
      setSharing(false)
    }
  }

  const poppins = 'var(--font-poppins), system-ui, sans-serif'

  // ── Shared background layers ──────────────────────────────────────────────
  const PhotoLayers = () => (
    <>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${moodPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 15%',
          filter: 'grayscale(1) contrast(1.15) brightness(0.8)',
        }}
      />
      {chapter.cityPhoto && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${chapter.cityPhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            filter: 'grayscale(1)',
            opacity: 0.14,
            mixBlendMode: 'screen',
          }}
        />
      )}
      {/* Archetype-specific duotone */}
      <div
        className="absolute inset-0"
        style={{
          background: archetype.duotone,
          mixBlendMode: 'multiply',
          opacity: 0.78,
        }}
      />
    </>
  )

  return (
    <div
      style={{
        display: 'flex',
        height: '100dvh',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
        fontFamily: poppins,
      }}
    >

      {/* ═══════════════════════════════════════════════════════
          PAGE 1 — MAGAZINE COVER
          ═══════════════════════════════════════════════════════ */}
      <div
        ref={page1Ref}
        style={{
          position: 'relative',
          flexShrink: 0,
          width: '100vw',
          height: '100dvh',
          maxWidth: '448px',
          scrollSnapAlign: 'start',
          background: '#180A5C',
          overflow: 'hidden',
        }}
      >
        <PhotoLayers />

        {/* Gradient: photo open at top → solid navy at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(24,10,92,0.04) 0%, rgba(24,10,92,0.18) 32%, rgba(24,10,92,0.88) 55%, #180A5C 68%)',
          }}
        />

        {/* ── MASTHEAD — pinned to top ─────────────────────── */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '14px', fontWeight: 800, letterSpacing: '0.38em', color: 'rgba(255,255,255,0.95)', textTransform: 'uppercase' }}>
              Pavilion
            </p>
            <div style={{ padding: '5px 13px', borderRadius: '999px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'rgba(223,40,91,0.9)', color: '#fff' }}>
              Chapter DNA
            </div>
          </div>
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.14)', marginTop: '11px' }} />
        </div>

        {/* ── COVER CONTENT — pinned to bottom ──────────────── */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 20px 28px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.24em', color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', marginBottom: '3px' }}>
            Chapter Snapshot
          </p>
          <p style={{ fontSize: chapterFontSize(chapter.name), fontWeight: 800, color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>
            {chapter.name}
          </p>

          <div style={{ height: '3px', width: '48px', background: archetype.accent, borderRadius: '999px', margin: '9px 0 16px' }} />

          <p style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.28em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase', marginBottom: '1px' }}>
            The
          </p>
          <h1 style={{ fontSize: archetypeFontSize(name), fontWeight: 900, color: '#fff', lineHeight: 0.88, letterSpacing: '-0.025em', marginBottom: '10px' }}>
            {name}
          </h1>

          <p style={{ fontSize: '13px', fontWeight: 600, color: archetype.accentLight, letterSpacing: '0.01em', marginBottom: '14px' }}>
            {tagline}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '18px' }}>
            {traits.map((trait) => (
              <span key={trait} style={{ fontSize: '10px', fontWeight: 700, padding: '5px 12px', borderRadius: '999px', letterSpacing: '0.04em', background: `${archetype.accent}20`, color: archetype.accentLight, border: `1px solid ${archetype.accent}70` }}>
                {trait}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.24)', letterSpacing: '0.05em' }}>
              Swipe for full story →
            </p>
            <button onClick={handleShare} disabled={sharing} style={{ fontSize: '12px', fontWeight: 700, padding: '7px 20px', borderRadius: '999px', background: archetype.accent, color: '#fff', letterSpacing: '0.04em', opacity: sharing ? 0.6 : 1 }}>
              {sharing ? 'Saving…' : 'Share ↗'}
            </button>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          PAGE 2 — EDITORIAL SPREAD
          ═══════════════════════════════════════════════════════ */}
      <div
        ref={page2Ref}
        style={{
          position: 'relative',
          flexShrink: 0,
          width: '100vw',
          height: '100dvh',
          maxWidth: '448px',
          scrollSnapAlign: 'start',
          background: '#180A5C',
          overflowY: 'auto',
        }}
      >
        <PhotoLayers />

        {/* Photo bleeds at top, fades to solid navy */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(24,10,92,0.68) 0%, rgba(24,10,92,0.88) 22%, #180A5C 40%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            padding: '20px 20px 28px',
          }}
        >
          {/* ── Nav bar ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.26em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' }}>
              ← Swipe back
            </p>
            <div style={{ padding: '5px 13px', borderRadius: '999px', fontSize: '9px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}>
              Full Story
            </div>
          </div>

          {/* ── Header ── */}
          <div style={{ marginBottom: '14px' }}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.22em', color: archetype.accent, textTransform: 'uppercase', marginBottom: '4px' }}>
              {chapter.name} · Chapter Snapshot
            </p>
            <h2 style={{ fontSize: archetypeFontSize(name), fontWeight: 900, color: '#fff', lineHeight: 0.88, letterSpacing: '-0.025em', marginBottom: '12px' }}>
              {name}
            </h2>

            {/* Pull-quote tagline */}
            <div style={{ display: 'flex', alignItems: 'stretch', gap: '10px' }}>
              <div style={{ width: '3px', flexShrink: 0, background: archetype.accent, borderRadius: '999px' }} />
              <p style={{ fontSize: '14px', fontWeight: 700, color: archetype.accentLight, fontStyle: 'italic', lineHeight: 1.4 }}>
                {tagline}
              </p>
            </div>
          </div>

          {/* ── Description ── */}
          <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.58)' }}>
            {description}
          </p>

          <Divider />

          {/* ── Chapter Manifesto ── */}
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.26em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginBottom: '14px' }}>
            Chapter Manifesto
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {manifesto.map((line, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, color: archetype.accent, letterSpacing: '0.04em', flexShrink: 0, lineHeight: 1 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff', lineHeight: 1.3, letterSpacing: '-0.01em' }}>
                  {line}
                </p>
              </div>
            ))}
          </div>

          <Divider />

          {/* ── Chapter Traits ── */}
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.26em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Chapter Traits
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {traits.map((trait) => (
              <span key={trait} style={{ fontSize: '11px', fontWeight: 600, padding: '6px 14px', borderRadius: '999px', background: 'rgba(223,40,91,0.12)', color: '#F88CA8', border: '1px solid rgba(223,40,91,0.32)' }}>
                {trait}
              </span>
            ))}
          </div>

          <Divider />

          {/* ── By the Numbers — horizontal 3-col ── */}
          <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.26em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginBottom: '12px' }}>
            By the Numbers
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {[
              { label: 'Drink', value: drink },
              { label: 'Spot', value: spot },
              { label: 'We say', value: says, accent: true },
            ].map(({ label, value, accent }) => (
              <div
                key={label}
                style={{
                  borderRadius: '12px',
                  padding: '12px 10px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <span style={{ fontSize: '8px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)' }}>
                  {label}
                </span>
                <span style={{ fontSize: '11px', fontWeight: accent ? 600 : 500, color: accent ? archetype.accentLight : 'rgba(255,255,255,0.85)', fontStyle: accent ? 'italic' : 'normal', lineHeight: 1.3 }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* ── Social Share Buttons ── */}
          <div style={{ paddingTop: '16px' }}>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', marginBottom: '10px' }}>
              Share your DNA
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <button
                onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=600')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '10px', background: '#0A66C2', color: '#fff', fontSize: '12px', fontWeight: 700 }}
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </button>
              <button
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank', 'width=600,height=600')}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '10px', background: '#1877F2', color: '#fff', fontSize: '12px', fontWeight: 700 }}
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Facebook
              </button>
              <button
                onClick={() => { navigator.clipboard.writeText(window.location.href) }}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', borderRadius: '10px', background: 'linear-gradient(45deg, #833AB4, #FD1D1D, #F77737)', color: '#fff', fontSize: '12px', fontWeight: 700 }}
              >
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                Instagram
              </button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase' }}>
                joinpavilion.com · 2026
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={handleShare} disabled={sharing} style={{ fontSize: '11px', fontWeight: 700, padding: '6px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', opacity: sharing ? 0.6 : 1 }}>
                  {sharing ? '…' : 'Save'}
                </button>
                <button onClick={handleDownloadPDF} disabled={exporting} style={{ fontSize: '11px', fontWeight: 700, padding: '6px 14px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)', opacity: exporting ? 0.6 : 1 }}>
                  {exporting ? '…' : 'PDF'}
                </button>
                <button onClick={onRestart} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)' }}>
                  Retake
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
