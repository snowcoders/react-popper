import * as React from 'react'
import * as PropTypes from 'prop-types';

export interface ITargetChildProps {
  ref: React.Ref<any>
}

export interface ITargetProps {
  componentFactory: (props: ITargetChildProps) => React.ReactNode,
}

export class Target extends React.Component<ITargetProps> {
  static contextTypes = {
    popperManager: PropTypes.object,
  }

  render() {

    const { popperManager } = this.context;
    const targetRef = (node: React.ReactNode) => {
      if (popperManager != null) {
        popperManager.setTargetNode(node)
      }
    }

    const targetProps = { ref: targetRef }
    return this.props.componentFactory(targetProps)
  }
}