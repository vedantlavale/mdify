// YouTube video utilities

export function getYouTubeEmbed(videoId: string, autoplay = true): string {
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}?si=yMFGKH6gQfksxv3C&autoplay=${autoplay ? '1' : '0'}&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
}
