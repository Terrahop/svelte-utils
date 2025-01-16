/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const useActions = (node, actions) => {
    const actionReturns = [];
    if (actions) {
        for (const actionEntry of actions) {
            const action = Array.isArray(actionEntry) ? actionEntry[0] : actionEntry;
            if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                actionReturns.push(action(node, actionEntry[1]));
            }
            else {
                actionReturns.push(action(node));
            }
        }
    }
    return {
        update(actions) {
            if (((actions?.length) ?? 0) !== actionReturns.length) {
                throw new Error('You must not change the length of an actions array.');
            }
            if (actions) {
                for (const [i, actionEntry] of actions.entries()) {
                    const returnEntry = actionReturns[i];
                    if (returnEntry && returnEntry.update) {
                        if (Array.isArray(actionEntry) && actionEntry.length > 1) {
                            returnEntry.update(actionEntry[1]);
                        }
                        else {
                            returnEntry.update();
                        }
                    }
                }
            }
        },
        destroy() {
            for (const returnEntry of actionReturns) {
                if (returnEntry && returnEntry.destroy) {
                    returnEntry.destroy();
                }
            }
        }
    };
};
