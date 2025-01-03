const preventScrollFunc = (e) => {
    e.preventDefault();
};
export const preventScroll = (node, enabled = true) => {
    if (enabled)
        node.addEventListener('wheel', preventScrollFunc);
    return {
        update(enabledd) {
            enabled = enabledd;
        },
        destroy() {
            node.removeEventListener('wheel', preventScrollFunc);
        }
    };
};
