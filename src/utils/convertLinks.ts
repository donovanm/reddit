export default (parent: Element, router: any): void => {
  if (parent) {
    parent.querySelectorAll('a').forEach((el: HTMLAnchorElement) => {
      // The event handlers are being added more than once to each element since
      // `updated` gets called multiple times. Need to find a better solution than
      // simply using `.onclick` instead of `addEventListener`.
      const url = el.href;

      if (url.startsWith(`${location.origin}/r/`)) {
        el.onclick = (event: Event): void => {
          event.preventDefault();
          router.push(url.split(location.origin)[1]);
        };
      } else if (url.startsWith('https://www.reddit.com/r/') && !url.includes('comments')) {
        el.onclick = (event: Event): void => {
          event.preventDefault();
          router.push(url.split('https://www.reddit.com/r/')[1]);
        };
      }
    });
  }
};
