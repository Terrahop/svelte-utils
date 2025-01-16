import { fly } from 'svelte/transition';
import type { Transition, TransitionParams } from '../../transitions/transitions.js';
type FlyTransition = typeof fly;
import type { ModalComponent } from './types.js';
declare class __sveltets_Render<TransitionIn extends Transition = FlyTransition, TransitionOut extends Transition = FlyTransition> {
    props(): {
        [x: string]: any;
        components?: Record<string, ModalComponent> | undefined;
        position?: string | undefined;
        background?: string | undefined;
        width?: string | undefined;
        height?: string | undefined;
        padding?: string | undefined;
        spacing?: string | undefined;
        rounded?: string | undefined;
        shadow?: string | undefined;
        zIndex?: string | undefined;
        buttonNeutral?: string | undefined;
        buttonPositive?: string | undefined;
        buttonTextCancel?: string | undefined;
        buttonTextConfirm?: string | undefined;
        buttonTextSubmit?: string | undefined;
        buttonSize?: string | undefined;
        regionBackdrop?: string | undefined;
        regionTransition?: string | undefined;
        regionHeader?: string | undefined;
        regionBody?: string | undefined;
        regionFooter?: string | undefined;
        transitions?: false | undefined;
        transitionIn?: TransitionIn | undefined;
        transitionInParams?: TransitionParams<TransitionIn> | undefined;
        transitionOut?: TransitionOut | undefined;
        transitionOutParams?: TransitionParams<TransitionOut> | undefined;
    };
    events(): {
        touchstart: TouchEvent;
        touchend: TouchEvent;
        backdrop: CustomEvent<MouseEvent>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots(): {};
    bindings(): string;
    exports(): {};
}
interface $$IsomorphicComponent {
    new <TransitionIn extends Transition = FlyTransition, TransitionOut extends Transition = FlyTransition>(options: import('svelte').ComponentConstructorOptions<ReturnType<__sveltets_Render<TransitionIn, TransitionOut>['props']>>): import('svelte').SvelteComponent<ReturnType<__sveltets_Render<TransitionIn, TransitionOut>['props']>, ReturnType<__sveltets_Render<TransitionIn, TransitionOut>['events']>, ReturnType<__sveltets_Render<TransitionIn, TransitionOut>['slots']>> & {
        $$bindings?: ReturnType<__sveltets_Render<TransitionIn, TransitionOut>['bindings']>;
    } & ReturnType<__sveltets_Render<TransitionIn, TransitionOut>['exports']>;
    <TransitionIn extends Transition = FlyTransition, TransitionOut extends Transition = FlyTransition>(internal: unknown, props: ReturnType<__sveltets_Render<TransitionIn, TransitionOut>['props']> & {
        $$events?: ReturnType<__sveltets_Render<TransitionIn, TransitionOut>['events']>;
    }): ReturnType<__sveltets_Render<TransitionIn, TransitionOut>['exports']>;
    z_$$bindings?: ReturnType<__sveltets_Render<any, any>['bindings']>;
}
declare const Modal: $$IsomorphicComponent;
type Modal<TransitionIn extends Transition = FlyTransition, TransitionOut extends Transition = FlyTransition> = InstanceType<typeof Modal<TransitionIn, TransitionOut>>;
export default Modal;
