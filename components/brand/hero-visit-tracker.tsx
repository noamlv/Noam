type HeroVisitTrackerProps = {
  currentIndex: number;
  total: number;
};

export function HeroVisitTracker({ currentIndex, total }: HeroVisitTrackerProps) {
  const nextIndex = (currentIndex + 1) % total;

  return <script dangerouslySetInnerHTML={{ __html: `document.cookie="noam_hero_index=${nextIndex}; Path=/; SameSite=Lax";` }} />;
}
