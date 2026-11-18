let locks = 0;
let previousOverflow = "";

// A menu can hand off to another dialog without unlocking the page underneath.
export function lockBodyScroll() {
  if (locks++ === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  let released = false;
  return () => {
    if (released) return;
    released = true;
    if (--locks === 0) document.body.style.overflow = previousOverflow;
  };
}
