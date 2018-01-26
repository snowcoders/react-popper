import * as React from 'react'

export interface IArrowChildProps {
  ref: React.Ref<any>
}

export interface IArrowProps {
  componentFactory: (props: IArrowChildProps) => React.ReactNode,
}

export class Arrow extends React.Component<IArrowProps> {
  render() {

    const { popperManager } = this.context;
    const arrowRef = (node: React.ReactNode) => {
      popperManager.setArrowNode(node)
    }

    const arrowProps = { ref: arrowRef }
    return this.props.componentFactory(arrowProps)
  }
}