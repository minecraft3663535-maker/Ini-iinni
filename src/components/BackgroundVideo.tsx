import { useEffect, useRef } from 'react'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4'
const SENSITIVITY = 0.8

export default function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTime = useRef(0)
  const isSeeking = useRef(false)

  const seek = () => {
    const video = videoRef.current
    if (!video) return
    if (Math.abs(video.currentTime - targetTime.current) < 0.001) return
    isSeeking.current = true
    video.currentTime = targetTime.current
  }

  const handleSeeked = () => {
    isSeeking.current = false
    const video = videoRef.current
    // Queue the next seek only if the target moved while the last one was in flight
    if (video && Math.abs(video.currentTime - targetTime.current) > 0.001) seek()
  }

  useEffect(() => {
    let prevX: number | null = null

    const onMouseMove = (e: MouseEvent) => {
      const video = videoRef.current
      if (!video || !video.duration || Number.isNaN(video.duration)) {
        prevX = e.clientX
        return
      }
      if (prevX === null) {
        prevX = e.clientX
        return
      }
      const delta = e.clientX - prevX
      prevX = e.clientX

      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTime.current = Math.min(Math.max(targetTime.current + offset, 0), video.duration)

      if (!isSeeking.current) seek()
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      className="fixed inset-0 z-0 h-full w-full object-cover"
      style={{ objectPosition: '70% center' }}
    />
  )
}
