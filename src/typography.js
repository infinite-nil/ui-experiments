function main() {
  const elements = [];

  function setup(selector) {
    const element = document.querySelector(selector);
    const text = element.textContent;

    if (text) {
      const list = [...text];

      // Clear content
      element.textContent = "";

      // Append new HTML
      list.forEach((letter) => {
        const span = document.createElement("span");

        span.textContent = letter;
        element.appendChild(span);

        elements.push({
          element: span,
          position: undefined,
        });
      });

      elements.forEach((element, index) => {
        const rect = element.element.getBoundingClientRect();
        element.position = rect.x + rect.width / 2;
      });
    }
  }

  function getElementProximity(element, clientX) {
    return {
      deltaX: Math.abs(Math.floor(clientX) - Math.floor(element.position)),
    };
  }

  function animateElement(element, delta) {
    if (delta <= 200) {
      const value = 200 - delta;

      element.setAttribute("style", `font-weight: ${Math.floor(value * 4)}`);
    }
  }

  function onMouseMove(event) {
    const { clientX } = event;

    for (const element of elements) {
      const { deltaX } = getElementProximity(element, clientX);

      requestAnimationFrame(() => animateElement(element.element, deltaX));
    }
  }

  /**
   * Event listeners
   */
  document.addEventListener("mousemove", onMouseMove);

  /**
   * Setup
   */
  setup(".typography");
}

main();
