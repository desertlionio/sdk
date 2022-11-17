export function getCoordinates(
  event: Event
): { clientX: number; clientY: number } | null {
  const eventsWithCoordinates: Record<string, any> = {
    mouseup: true,
    mousedown: true,
    mousemove: true,
    mouseover: true,
  };

  if (eventsWithCoordinates[event.type]) {
    const { clientX, clientY } = event as MouseEvent;
    return { clientX, clientY };
  }

  return null;
}
