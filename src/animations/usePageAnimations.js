import { useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export default function usePageAnimations(page, rootRef) {
  useLayoutEffect(() => {
    const root = rootRef.current?.querySelector('.page-transition');
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const splitInstances = [];
    const context = gsap.context(() => {
      gsap.utils.toArray('.motion-reveal', root).forEach((element, index) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 38 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay: Math.min(index * 0.035, 0.14),
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        });
      });

      const headings = gsap.utils.toArray('h1, h2, blockquote', root);
      headings.forEach((heading) => {
        const split = new SplitType(heading, { types: 'lines' });
        splitInstances.push(split);
        gsap.from(split.lines, {
          yPercent: 105,
          autoAlpha: 0,
          duration: 1.05,
          stagger: 0.075,
          ease: 'power4.out',
          scrollTrigger: { trigger: heading, start: 'top 86%', once: true },
        });
      });

      gsap.utils.toArray('.purpose-cards article, .gallery-grid figure, .event-list article', root).forEach((card, index) => {
        gsap.fromTo(card, { y: 26, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          delay: (index % 3) * 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 92%', once: true },
        });
      });
    }, root);

    return () => {
      context.revert();
      splitInstances.forEach((split) => split.revert());
    };
  }, [page, rootRef]);
}
