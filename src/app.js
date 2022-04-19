function main() {
  const elements = [];
  const button = document.querySelector(".button");

  function attachElemt(element, { x, y }) {
    const { top, left, width, height } = element.getBoundingClientRect();

    elements.push({
      element,
      threshold: {
        x,
        y,
      },
      elementPosition: {
        x: left,
        y: top,
        width,
        height,
      },
    });
  }

  function getElementProximity(element, clientX, clientY) {
    return {
      deltaX:
        Math.floor(clientX) -
        Math.floor(
          element.elementPosition.x + element.elementPosition.width / 2
        ),
      deltaY:
        Math.floor(clientY) -
        Math.floor(
          element.elementPosition.y + element.elementPosition.height / 2
        ),
    };
  }

  function onMouseMove(event) {
    const { clientX, clientY } = event;

    for (const element of elements) {
      const { deltaX, deltaY } = getElementProximity(element, clientX, clientY);

      if (
        Math.abs(deltaX) <= element.threshold.x &&
        Math.abs(deltaY) <= element.threshold.y
      ) {
        // Handle animations base on proximity
      }
    }
  }

  /**
   * Setup
   */
  attachElemt(button, { x: 400, y: 100 });

  /**
   * Event listeners
   */
  document.addEventListener("mousemove", onMouseMove);
}

main();
