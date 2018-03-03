import * as React from "react";
import * as ReactDOM from "react-dom";

export interface IManagerProps { }

export class Manager extends React.Component<IManagerProps> {
    static childContextTypes = {
        popperManager: () => {
            return null;
        },
    };

    private _targetNode: Element;

    getChildContext() {
        return {
            popperManager: {
                setTargetNode: this._setTargetNode,
                getTargetNode: this._getTargetNode,
            },
        };
    }

    _setTargetNode = (node: React.ReactNode) => {
        this._targetNode = ReactDOM.findDOMNode(node as any);
    };

    _getTargetNode = () => {
        return this._targetNode;
    };

    render() {
        return this.props.children;
    }
}
