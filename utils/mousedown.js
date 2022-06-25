/*eslint-disable */

export const resizer = element => (e) => {
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    const prevX = e.x;
    const leftPanel = element.getBoundingClientRect();

    function mousemove(e) {
        const newX = prevX - e.x;
        element.style.width = `${leftPanel.width - newX}px`;
    }

    function mouseup() {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
    }
};

export const verticalResizer = element => (e) => {
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    const prevY = e.y;
    const leftTopPanel = element.getBoundingClientRect();

    function mousemove(e) {
        const newX = prevY - e.y;
        element.style.height = `${leftTopPanel.height - newX}px`;
    }

    function mouseup() {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);
    }
};
