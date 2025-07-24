export function debounce<T extends (...args: any[]) => any>(fn: T, wait: number) {
  let timeout: NodeJS.Timeout
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(fn: T, wait: number) {
  let lastTime = 0
  const throttled = function (this: any, ...args: Parameters<T>) {
    const now = Date.now()
    if (now - lastTime >= wait) {
      fn.apply(this, args)
      lastTime = now
    }
  }
  throttled.cancel = (): void => {
    lastTime = 0
  }
  return throttled
}

export function rotatePoint(x: number, y: number, angle: number, centerX: number, centerY: number) {
  const rad = (angle * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)

  const dx = x - centerX
  const dy = y - centerY

  return {
    x: centerX + dx * cos - dy * sin,
    y: centerY + dx * sin + dy * cos,
  }
}
