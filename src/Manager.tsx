import * as React from 'react';
import Popper from "popper.js";

export interface IManagerProps {
}

export class Manager extends React.Component<IManagerProps> {
  static childContextTypes = {
    popperManager: () => { return null; }
  }

  private _targetNode: React.ReactNode;

  getChildContext() {
    return {
      popperManager: {
        setTargetNode: this._setTargetNode,
        getTargetNode: this._getTargetNode,
      },
    }
  }

  _setTargetNode = (node: React.ReactNode) => {
    this._targetNode = node
  }

  _getTargetNode = () => {
    return this._targetNode
  }

  render() {
    return this.props.children;
  }
}
