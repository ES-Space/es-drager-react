/**
 * get the snap position
 * @param pos - the position
 * @param rect - the rect
 * @param elements - the elements
 * @param threshold - the threshold
 * @returns the snap position
 */
export function getSnapPosition(
  pos: { x: number, y: number },
  rect: DOMRect,
  elements: HTMLDivElement[],
  threshold: number,
) {
  const result = { ...pos }

  // center line
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  elements.forEach((el) => {
    const elRect = el.getBoundingClientRect()
    const elCenterX = elRect.left + elRect.width / 2
    const elCenterY = elRect.top + elRect.height / 2

    // check edge and center line
    const snapPoints = [
      // horizontal alignment points
      { source: rect.left, target: elRect.left }, // left to left
      { source: rect.right, target: elRect.right }, // right to right
      { source: rect.left, target: elRect.right }, // left to right
      { source: rect.right, target: elRect.left }, // right to left
      { source: centerX, target: elCenterX }, // center to center

      // vertical alignment points
      { source: rect.top, target: elRect.top }, // top to top
      { source: rect.bottom, target: elRect.bottom }, // bottom to bottom
      { source: rect.top, target: elRect.bottom }, // top to bottom
      { source: rect.bottom, target: elRect.top }, // bottom to top
      { source: centerY, target: elCenterY }, // center to center
    ]

    // horizontal snap
    snapPoints.slice(0, 5).forEach(({ source, target }) => {
      const diff = Math.abs(source - target)
      if (diff < threshold) {
        result.x = pos.x - (source - target)
      }
    })

    // vertical snap
    snapPoints.slice(5).forEach(({ source, target }) => {
      const diff = Math.abs(source - target)
      if (diff < threshold) {
        result.y = pos.y - (source - target)
      }
    })
  })

  return result
}
