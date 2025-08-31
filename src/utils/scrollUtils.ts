/**
 * Smooth scroll utility functions for navigation
 */

export const smoothScrollTo = (elementId: string, offset: number = 80) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

export const getActiveSection = (): string => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  let activeSection = 'home';
  
  sections.forEach((section) => {
    const element = section as HTMLElement;
    const { offsetTop, offsetHeight } = element;
    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
      activeSection = element.id;
    }
  });
  
  return activeSection;
};

export const isElementInView = (element: HTMLElement, threshold: number = 0.3): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  
  const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
  const elementHeight = rect.height;
  
  return visibleHeight / elementHeight >= threshold;
};