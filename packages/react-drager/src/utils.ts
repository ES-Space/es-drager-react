export function getDragerElements(): HTMLElement[] {
  return Array.from(document.querySelectorAll('[data-drager]'))
}

export function getSnapPosition(
  pos: { x: number, y: number },
  rect: DOMRect,
  elements: HTMLDivElement[],
  threshold: number,
) {
  const result = { ...pos }

  // 中心线
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2

  elements.forEach((el) => {
    const elRect = el.getBoundingClientRect()
    const elCenterX = elRect.left + elRect.width / 2
    const elCenterY = elRect.top + elRect.height / 2

    // 检查边缘和中心线
    const snapPoints = [
      // 水平对齐点
      { source: rect.left, target: elRect.left }, // 左对左
      { source: rect.right, target: elRect.right }, // 右对右
      { source: rect.left, target: elRect.right }, // 左对右
      { source: rect.right, target: elRect.left }, // 右对左
      { source: centerX, target: elCenterX }, // 中心对中心

      // 垂直对齐点
      { source: rect.top, target: elRect.top }, // 上对上
      { source: rect.bottom, target: elRect.bottom }, // 下对下
      { source: rect.top, target: elRect.bottom }, // 上对下
      { source: rect.bottom, target: elRect.top }, // 下对上
      { source: centerY, target: elCenterY }, // 中心对中心
    ]

    // 水平吸附
    snapPoints.slice(0, 5).forEach(({ source, target }) => {
      const diff = Math.abs(source - target)
      if (diff < threshold) {
        result.x = pos.x - (source - target)
      }
    })

    // 垂直吸附
    snapPoints.slice(5).forEach(({ source, target }) => {
      const diff = Math.abs(source - target)
      if (diff < threshold) {
        result.y = pos.y - (source - target)
      }
    })
  })

  return result
}
