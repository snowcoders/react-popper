import * as React from "react";

export interface ITargetChildProps {
    ref: React.Ref<any>;
}

export interface ITargetProps {
    componentFactory: (props: ITargetChildProps) => React.ReactNode;
}

export class Target extends React.Component<ITargetProps> {
    static contextTypes = {
        popperManager: () => {
            return null;
        },
    };

    render() {
        const { popperManager } = this.context;
        const targetRef = (node: React.ReactNode) => {
            if (popperManager != null) {
                popperManager.setTargetNode(node);
            }
        };

        const targetProps = { ref: targetRef };
        return this.props.componentFactory(targetProps);
    }
}
