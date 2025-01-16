import { get, writable } from 'svelte/store';
import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
import { random } from '../helpers.js';
export const storePopup = writable();
export const initPopupStore = () => {
    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
};
export const createTooltip = ({ position }) => {
    const id = random();
    const opts = {
        event: 'hover',
        target: id,
        placement: position ?? 'bottom',
        closeQuery: 'a, li, button'
    };
    return {
        popup,
        opts,
        id
    };
};
export const popup = (triggerNode, args) => {
    args.outsideClose ??= true;
    const { computePosition, autoUpdate, offset, shift, flip, arrow, size, autoPlacement, hide, inline } = get(storePopup);
    const popupState = {
        open: false,
        autoUpdateCleanup: () => { }
    };
    const focusableAllowedList = ':is(a[href], button, input, textarea, select, details, [tabindex]):not([tabindex="-1"])';
    let focusablePopupElements;
    let elemPopup;
    let elemArrow;
    const setDomElements = () => {
        elemPopup = document.querySelector(`[data-popup="${args.target}"]`) ?? document.createElement('div');
        elemArrow = elemPopup.querySelector('.arrow') ?? document.createElement('div');
    };
    setDomElements();
    const render = () => {
        if (!elemPopup)
            throw new Error(`The data-popup="${args.target}" element was not found.`);
        if (!computePosition)
            throw new Error(`Floating UI 'computePosition' not found for data-popup="${args.target}".`);
        if (!offset)
            throw new Error(`Floating UI 'offset' not found for data-popup="${args.target}".`);
        if (!shift)
            throw new Error(`Floating UI 'shift' not found for data-popup="${args.target}".`);
        if (!flip)
            throw new Error(`Floating UI 'flip' not found for data-popup="${args.target}".`);
        if (!arrow)
            throw new Error(`Floating UI 'arrow' not found for data-popup="${args.target}".`);
        const optionalMiddleware = [];
        if (size)
            optionalMiddleware.push(size(args.middleware?.size));
        if (autoPlacement)
            optionalMiddleware.push(autoPlacement(args.middleware?.autoPlacement));
        if (hide)
            optionalMiddleware.push(hide(args.middleware?.hide));
        if (inline)
            optionalMiddleware.push(inline(args.middleware?.inline));
        computePosition(triggerNode, elemPopup, {
            placement: args.placement ?? 'bottom',
            middleware: [
                offset(args.middleware?.offset ?? 8),
                shift(args.middleware?.shift ?? { padding: 8 }),
                flip(args.middleware?.flip),
                arrow(args.middleware?.arrow ?? { element: elemArrow || null }),
                ...optionalMiddleware
            ]
        }).then(({ x, y, placement, middlewareData }) => {
            Object.assign(elemPopup.style, {
                left: `${x}px`,
                top: `${y}px`
            });
            if (elemArrow) {
                const { x: arrowX, y: arrowY } = middlewareData.arrow;
                const staticSide = {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right'
                }[placement.split('-')[0]];
                Object.assign(elemArrow.style, {
                    left: arrowX == undefined ? '' : `${arrowX}px`,
                    top: arrowY == undefined ? '' : `${arrowY}px`,
                    right: '',
                    bottom: '',
                    [staticSide]: '-4px'
                });
            }
        });
    };
    const open = () => {
        if (!elemPopup)
            return;
        popupState.open = true;
        if (args.state)
            args.state({ state: popupState.open });
        render();
        elemPopup.style.display = 'block';
        elemPopup.style.opacity = '1';
        elemPopup.style.pointerEvents = 'auto';
        elemPopup.removeAttribute('inert');
        popupState.autoUpdateCleanup = autoUpdate(triggerNode, elemPopup, render);
        focusablePopupElements = [...(elemPopup.querySelectorAll(focusableAllowedList))];
    };
    const close = (callback) => {
        if (!elemPopup)
            return;
        const cssTransitionDuration = Number.parseFloat(window.getComputedStyle(elemPopup).transitionDuration.replace('s', '')) * 1000;
        setTimeout(() => {
            popupState.open = false;
            if (args.state)
                args.state({ state: popupState.open });
            elemPopup.style.opacity = '0';
            elemPopup.setAttribute('inert', '');
            if (popupState.autoUpdateCleanup)
                popupState.autoUpdateCleanup();
            if (callback)
                callback();
        }, cssTransitionDuration);
    };
    const toggle = () => {
        if (popupState.open)
            close();
        else
            open();
    };
    const onWindowClick = (event) => {
        if (!popupState.open)
            return;
        if (triggerNode.contains(event.target))
            return;
        if (elemPopup && !elemPopup.contains(event.target) && args.outsideClose) {
            close();
            return;
        }
        const closeQueryString = args.closeQuery === undefined ? 'a[href], button' : args.closeQuery;
        if (closeQueryString === '')
            return;
        const closableMenuElements = elemPopup.querySelectorAll(closeQueryString);
        for (const elem of closableMenuElements) {
            if (elem.contains(event.target))
                close();
        }
    };
    const onWindowKeyDown = (event) => {
        if (!popupState.open)
            return;
        const key = event.key;
        if (key === 'Escape') {
            event.preventDefault();
            triggerNode.focus();
            close();
            return;
        }
        focusablePopupElements = [...(elemPopup.querySelectorAll(focusableAllowedList))];
        const triggerMenuFocused = popupState.open && document.activeElement === triggerNode;
        if (triggerMenuFocused &&
            (key === 'ArrowDown' || key === 'Tab') &&
            focusableAllowedList.length > 0 &&
            focusablePopupElements.length > 0) {
            event.preventDefault();
            focusablePopupElements[0].focus();
        }
    };
    switch (args.event) {
        case 'click':
            triggerNode.addEventListener('click', toggle, true);
            window.addEventListener('click', onWindowClick, true);
            break;
        case 'hover':
            triggerNode.addEventListener('mouseover', open, true);
            triggerNode.addEventListener('mouseleave', () => close(), true);
            break;
        case 'focus-blur':
            triggerNode.addEventListener('focus', toggle, true);
            triggerNode.addEventListener('blur', () => close(), true);
            break;
        case 'focus-click':
            triggerNode.addEventListener('focus', open, true);
            window.addEventListener('click', onWindowClick, true);
            break;
        default:
            throw new Error(`Event value of '${args.event}' is not supported.`);
    }
    window.addEventListener('keydown', onWindowKeyDown, true);
    render();
    return {
        update(newArgs) {
            close(() => {
                args = newArgs;
                render();
                setDomElements();
            });
        },
        destroy() {
            triggerNode.removeEventListener('click', toggle, true);
            triggerNode.removeEventListener('mouseover', open, true);
            triggerNode.removeEventListener('mouseleave', () => close(), true);
            triggerNode.removeEventListener('focus', toggle, true);
            triggerNode.removeEventListener('focus', open, true);
            triggerNode.removeEventListener('blur', () => close(), true);
            window.removeEventListener('click', onWindowClick, true);
            window.removeEventListener('keydown', onWindowKeyDown, true);
        }
    };
};
