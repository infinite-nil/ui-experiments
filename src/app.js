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

  function getAngle(X1, Y1, X2, Y2) {
    const angle = (Math.atan2(Y2 - Y1, X2 - X1) * 180) / Math.PI;

    if (angle < 0) {
      return 360 + angle;
    }

    return angle;
  }

  function animateElement(element, x, y, angle) {
    console.log(`${Math.floor(angle)}deg`);

    element.setAttribute(
      "style",
      `transform: translate3D(${x}px, ${y}px, 0); background: linear-gradient(${Math.floor(
        angle
      )}deg,rgba(87, 77, 255, 1) 30%,rgba(207, 0, 255, 1) 100%);`
    );
  }

  function onMouseMove(event) {
    const { clientX, clientY } = event;

    for (const element of elements) {
      const { deltaX, deltaY } = getElementProximity(element, clientX, clientY);

      if (
        Math.abs(deltaX) <= element.threshold.x &&
        Math.abs(deltaY) <= element.threshold.y
      ) {
        requestAnimationFrame(() => {
          const angle = getAngle(
            Math.abs(
              element.elementPosition.x + element.elementPosition.width / 2
            ),
            Math.abs(
              element.elementPosition.y + element.elementPosition.height / 2
            ),
            clientX,
            clientY
          );

          animateElement(element.element, deltaX * 0.2, deltaY * 0.2, angle);
        });
      }
    }
  }

  /**
   * Setup
   */
  attachElemt(button, { x: 400, y: 400 });

  /**
   * Event listeners
   */
  document.addEventListener("mousemove", onMouseMove);
}

main();
