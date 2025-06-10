export default function initAOS(): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('aos-animate');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('[data-aos]').forEach((el) => {
    const delay = el.getAttribute('data-aos-delay');
    if (delay) {
      (el as HTMLElement).style.setProperty('--aos-delay', `${delay}ms`);
    }
    observer.observe(el);
  });
}
