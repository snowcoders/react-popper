import * as React from "react";

// Components
import { Manager, Target, Popper, Arrow } from "../dist/index";

// Styles
import "./app.scss";

export interface IAppProps { }

export interface IAppState { }

export class App extends React.Component<IAppProps, IAppState> {
    render() {
        return (
            <div className="app">
                <Manager>
                    <div className="container">
                        <span>I'm text before the</span>
                        {" "}
                        <Target componentFactory={(targetProps) => (
                            <span
                                {...targetProps}
                                style={{ fontWeight: 800 }}>
                                Target Box
                </span>
                        )} />
                        <Popper
                            placement="right"
                            componentFactory={(popperProps) => (
                                <span
                                    {...popperProps}
                                    className={"popper"}
                                >
                                    I'm the tooltip
                                    <Arrow componentFactory={(arrowProps) => (
                                        <span
                                            {...arrowProps}
                                            className="popper__arrow"
                                        />
                                    )} />
                                </span>
                            )}
                        />
                        {" "}
                        <span>for the popover</span>
                    </div>
                </Manager>
                {/*
            <Manager>
                <div style={{ position: 'relative', top: '200px' }}>
                    <span>I'm text before the</span>
                    {" "}
                    <Target componentFactory={(targetProps) => (
                        <span {...targetProps}>
                            Target Box
                    </span>
                    )}>
                    </Target>
                    <span style={{ position: 'fixed', top: '0px', left: '0px', right: '0px', bottom: '0px' }}>
                        <Popper
                            placement="bottom"
                            componentFactory={(popperProps) => (
                                <span
                                    {...popperProps}
                                    className={"popper"}
                                >
                                    I'm the tooltip
                                <Arrow componentFactory={(arrowProps) => (
                                        <span
                                            {...arrowProps}
                                            className="popper__arrow"
                                        />
                                    )}></Arrow>
                                </span>
                            )}
                        >
                        </Popper>
                    </span>
                    {" "}
                    <span>for the popover</span>
                </div>
            </Manager>
                        */}
            </div >
        );
    }
}