const injectRipple = (centered = false) => {
    return (event) => {
        const target = event.currentTarget;
        const circle = document.createElement('span');
        const upper = Math.max(target.clientWidth, target.clientHeight);
        const removeCircle = () => {
            circle.remove();
            circle.removeEventListener('animationend', removeCircle);
        };
        circle.addEventListener('animationend', removeCircle);
        circle.style.width = circle.style.height = `${upper}px`;
        const rect = target.getBoundingClientRect();
        if (centered) {
            circle.classList.add('absolute', 'top-0', 'left-0', 'ripple-centered', 'bg-primary-500/30');
        }
        else {
            circle.style.left = `${event.clientX - rect.left - upper / 2}px`;
            circle.style.top = `${event.clientY - rect.top - upper / 2}px`;
            circle.classList.add('ripple-normal', 'bg-primary-500/30');
        }
        circle.classList.add('ripple');
        target.append(circle);
    };
};
const createRipple = (centered) => {
    return (node) => {
        const onMouseDown = injectRipple(centered);
        node.addEventListener('click', onMouseDown);
        node.classList.add('ripple-pre');
        return {
            destroy: () => {
                node.removeEventListener('click', onMouseDown);
            }
        };
    };
};
export const ripple = createRipple();
export default createRipple;
