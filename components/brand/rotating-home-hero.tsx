"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { homeHeroes } from "@/lib/home-heroes";

const storageKey = "noam_hero_index";

export function RotatingHomeHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    try {
      const stored = Number.parseInt(window.localStorage.getItem(storageKey) ?? "0", 10);
      const current = Number.isInteger(stored) && stored >= 0 && stored < homeHeroes.length ? stored : 0;
      setIndex(current);
      window.localStorage.setItem(storageKey, String((current + 1) % homeHeroes.length));
    } catch {
      // Storage may be unavailable; the first image remains visible.
    }
  }, []);

  const hero = homeHeroes[index];
  return <Image src={hero.src} alt={hero.alt} width={1672} height={941} className="aspect-[1.35/1] w-full object-cover sm:aspect-[1.8/1] lg:aspect-[2.25/1]" priority sizes="(max-width: 768px) 100vw, 1160px" />;
}
