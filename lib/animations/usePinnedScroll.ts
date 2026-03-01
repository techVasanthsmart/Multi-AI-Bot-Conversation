import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PinnedScrollOptions {
  markers?: boolean;
  crossfadeDuration?: number;
  offsetY?: number;
}

export function usePinnedScroll(
  mediaContainerRef: React.RefObject<HTMLElement | null>,
  textContentRef: React.RefObject<HTMLElement | null>,
  options: PinnedScrollOptions = {}
) {
  const {
    markers = false,
    crossfadeDuration = 0.8,
    offsetY = 100,
  } = options;

  useEffect(() => {
    if (!mediaContainerRef.current || !textContentRef.current) return;

    const mediaContainer = mediaContainerRef.current;
    const textContent = textContentRef.current;

    // Pin the media container
    gsap.to(mediaContainer, {
      scrollTrigger: {
        trigger: mediaContainer,
        start: 'top top',
        end: 'bottom bottom',
        pin: true,
        pinSpacing: false,
        markers,
      },
    });

    // Find all markers in text content
    const markers_elements = gsap.utils.toArray<HTMLElement>(
      textContent.querySelectorAll('[data-marker]')
    );

    if (markers_elements.length === 0) return;

    // Get all images in media container
    const images = gsap.utils.toArray<HTMLElement>(
      mediaContainer.querySelectorAll('.marker-image')
    );

    if (images.length === 0) return;

    // Set initial state for images
    gsap.set(images, { opacity: 0, pointerEvents: 'none' });
    if (images[0]) {
      gsap.set(images[0], { opacity: 1, pointerEvents: 'auto' });
    }

    // Create scroll triggers for each marker
    markers_elements.forEach((markerElement, index) => {
      const markerName = markerElement.getAttribute('data-marker');
      if (!markerName) return;

      gsap.to('', {
        scrollTrigger: {
          trigger: markerElement,
          start: 'top center',
          onEnter: () => {
            if (images[index]) {
              // Fade out previous image
              if (images[index - 1]) {
                gsap.to(images[index - 1], {
                  opacity: 0,
                  duration: crossfadeDuration,
                  ease: 'power1.inOut',
                  pointerEvents: 'none',
                });
              }

              // Fade in current image
              gsap.to(images[index], {
                opacity: 1,
                duration: crossfadeDuration,
                ease: 'power1.inOut',
                pointerEvents: 'auto',
              });
            }
          },
          onEnterBack: () => {
            if (images[index]) {
              // Fade to previous on scroll back
              if (index > 0 && images[index - 1]) {
                gsap.to(images[index - 1], {
                  opacity: 1,
                  duration: crossfadeDuration,
                  ease: 'power1.inOut',
                  pointerEvents: 'auto',
                });
                gsap.to(images[index], {
                  opacity: 0,
                  duration: crossfadeDuration,
                  ease: 'power1.inOut',
                  pointerEvents: 'none',
                });
              }
            }
          },
          markers,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [mediaContainerRef, textContentRef, markers, crossfadeDuration, offsetY]);
}
