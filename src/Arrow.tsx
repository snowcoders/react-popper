import * as React from "react";

export interface IArrowChildProps {
    ref: React.Ref<any>;
}

export interface IArrowProps {
    componentFactory: (props: IArrowChildProps) => React.ReactNode;
}

export class Arrow extends React.Component<IArrowProps> {
    static contextTypes = {
        popper: () => {
            return null;
        },
    };

    render() {
        const arrowProps = {
            ref: this.setRef,
            style: this.getStyles()
        };
        return this.props.componentFactory(arrowProps);
    }

    private setRef = (node: React.ReactNode) => {
        const { popper } = this.context;
        if (popper != null) {
            popper.setArrowNode(node);
        }
    };

    private getStyles() {
        const { popper } = this.context;
        if (popper != null) {
            return popper.getArrowStyle();
        }
        return null;
    };
}
