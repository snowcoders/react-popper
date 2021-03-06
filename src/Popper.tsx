import * as React from "react";
import { PopperOptions, Data } from "popper.js";
import * as PopperJS from "popper.js";
import * as PopperJSDist from "popper.js/dist/umd/popper";

export interface IPopperChildProps {
    style: any;
    ref: (ref: React.ReactNode) => void;
    "data-placement": string | null;
}

export interface IPopperProps extends PopperOptions {
    componentFactory: (popperProps: IPopperChildProps) => React.ReactNode;
}

export interface IPopperState {
    data: Data | null;
}

export class Popper extends React.Component<IPopperProps, IPopperState> {
    static contextTypes = {
        popperManager: () => {
            return null;
        },
    };

    static childContextTypes = {
        popper: () => {
            return null;
        },
    };

    private _popper: PopperJS.default | null;
    private _arrowNode: React.ReactNode;
    private _node: Element;
    private _component: React.ReactNode;

    constructor(props: IPopperProps) {
        super(props);

        this.state = {
            data: null,
        };
    }

    // #region Child stuff
    getChildContext() {
        return {
            popper: {
                setArrowNode: this._setArrowNode,
                getArrowStyle: this._getArrowStyle,
            },
        };
    }

    _setArrowNode = (node: React.ReactNode) => {
        this._arrowNode = node;
    };

    _getArrowStyle = () => {
        if (!this.state.data || !this.state.data.offsets.arrow) {
            return {};
        } else {
            const { top, left } = this.state.data.offsets.arrow;
            return { top, left };
        }
    };
    // #endregion

    // #region Lifecycle stuff
    shouldComponentUpdate(nextProps: IPopperProps, nextState: IPopperState) {
        // TODO if some props change, we should re-render
        return true;
    }

    componentDidUpdate(lastProps: IPopperProps) {
        // TODO if any of the popper props change, we should destroy and recreate popper
        // {
        //   this._destroyPopper()
        //   this._createPopper()
        // }

        if (this._popper != null) {
            this._popper.scheduleUpdate();
        }
    }

    componentWillUnmount() {
        this._destroyPopper();
    }
    // #endregion

    _getTargetNode = () => {
        return this.context.popperManager.getTargetNode();
    };

    _createPopper() {
        const { componentFactory, children, ...popperProps } = this.props;

        let constructor = PopperJS.default;
        if (constructor == null) {
            // Not sure how someone got here but they did... I'm assuming their
            // build system isn't using modules, attempting something else
            constructor = PopperJSDist;
        }

        this._destroyPopper();
        this._popper = new constructor(this._getTargetNode(), this._node, {
            ...popperProps,
            modifiers: {
                ...popperProps.modifiers,
                applyStyle: { enabled: false },
                arrow: {
                    element: this._arrowNode as any,
                },
            },
            onUpdate: (data: Data) => {
                if (this.state.data == null && data == null) {
                } else if (
                    this.state.data != null &&
                    data != null &&
                    JSON.stringify(this.state.data.offsets) === JSON.stringify(data.offsets)
                ) {
                } else {
                    this.setState({ data });
                }
                return data;
            },
        });

        // schedule an update to make sure everything gets positioned correctly
        // after being instantiated
        this._popper.scheduleUpdate();
    }

    _destroyPopper() {
        if (this._popper != null) {
            this._popper.destroy();
            this._popper = null;
        }
    }

    _setNodeRef = (node: Element) => {
        this._node = node;
        if (this._node) {
            this._createPopper();
        }
    };

    render() {
        const { componentFactory } = this.props;

        this._component = componentFactory({
            style: this.state.data && this.state.data.styles,
            ref: this._setNodeRef,
            "data-placement": this.state.data && this.state.data.placement,
            //['data-x-out-of-boundaries']: popperHide,
        });

        return this._component;
    }
}
