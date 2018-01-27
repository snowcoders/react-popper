import * as React from 'react'

export interface IArrowChildProps {
  ref: React.Ref<any>
}

export interface IArrowProps {
  componentFactory: (props: IArrowChildProps) => React.ReactNode,
}

export class Arrow extends React.Component<IArrowProps> {
  static contextTypes = {
    popper: () => { return null; },
  }
  render() {

    const { popper } = this.context;
    const arrowRef = (node: React.ReactNode) => {
      if (popper != null) {
        popper.setArrowNode(node)
      }
    }

    const arrowProps = { ref: arrowRef }
    return this.props.componentFactory(arrowProps)
  }
}