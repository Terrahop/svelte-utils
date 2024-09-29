export const clickCopy = (element, params) => {
    element.classList.add('cursor-copy');
    const copyText = async (event) => {
        if (event.detail === 2)
            return;
        const text = params?.target
            ? document.querySelector(params.target)?.textContent
            : element.textContent;
        try {
            if (text) {
                await navigator.clipboard.writeText(text);
                params?.onCopy?.(text);
            }
            element.dispatchEvent(new CustomEvent('copysuccess', {
                bubbles: true
            }));
        }
        catch (error) {
            element.dispatchEvent(new CustomEvent('copyerror', {
                bubbles: true,
                detail: error
            }));
        }
    };
    element.addEventListener('click', copyText);
    return {
        update(newOpts) {
            params = newOpts;
        },
        destroy() {
            element.removeEventListener('click', copyText);
        }
    };
};
