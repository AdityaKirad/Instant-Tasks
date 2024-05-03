import { useEffect, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, matchesSet] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) matchesSet(media.matches);

    function listener() {
      matchesSet(media.matches);
    }

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
}

export { useMediaQuery };
