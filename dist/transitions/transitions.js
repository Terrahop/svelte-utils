export const dynamicTransition = (node, dynParams) => {
    const { transition, params, enabled } = dynParams;
    if (enabled)
        return transition(node, params);
    if ('duration' in params)
        return transition(node, { duration: 0 });
    return { duration: 0 };
};
