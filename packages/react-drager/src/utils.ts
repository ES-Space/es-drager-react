export function getDragerElements(): HTMLElement[] {
  return Array.from(document.querySelectorAll('[data-drager]'))
}

export function getSnapPosition(
  pos: { x: number, y: number },
  currentRect: DOMRect,
  elements: HTMLElement[],
  threshold: number,
) {
  const snappedPos = { ...pos }

  elements.forEach((element) => {
    const elementRect = element.getBoundingClientRect()

    // 转换为相对位置
    const currentLeft = pos.x
    const currentRight = pos.x + currentRect.width
    const currentTop = pos.y
    const currentBottom = pos.y + currentRect.height

    const targetLeft = elementRect.left - currentRect.left + pos.x
    const targetRight = elementRect.right - currentRect.left + pos.x
    const targetTop = elementRect.top - currentRect.top + pos.y
    const targetBottom = elementRect.bottom - currentRect.top + pos.y

    // 水平吸附
    if (Math.abs(currentLeft - targetLeft) < threshold)
      snappedPos.x = targetLeft
    if (Math.abs(currentRight - targetLeft) < threshold)
      snappedPos.x = targetLeft - currentRect.width
    if (Math.abs(currentLeft - targetRight) < threshold)
      snappedPos.x = targetRight
    if (Math.abs(currentRight - targetRight) < threshold)
      snappedPos.x = targetRight - currentRect.width

    // 垂直吸附
    if (Math.abs(currentTop - targetTop) < threshold)
      snappedPos.y = targetTop
    if (Math.abs(currentBottom - targetTop) < threshold)
      snappedPos.y = targetTop - currentRect.height
    if (Math.abs(currentTop - targetBottom) < threshold)
      snappedPos.y = targetBottom
    if (Math.abs(currentBottom - targetBottom) < threshold)
      snappedPos.y = targetBottom - currentRect.height
  })

  return snappedPos
}
