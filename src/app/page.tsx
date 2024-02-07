// app/page.tsx
'use client'
import { Link } from '@chakra-ui/next-js'
import HeroSection from './components/hero'
import Features from './components/features'

export default function Page() {
  return (
    <>
      <HeroSection />
      <Features />
    </>
  )
}
