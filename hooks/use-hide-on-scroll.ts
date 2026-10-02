"use client"

import * as React from "react"

export function useHideOnScroll() {
  const [hidden, setHidden] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      setHidden(window.scrollY > 80)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return hidden
}
