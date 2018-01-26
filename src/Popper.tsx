import * as React from 'react'
import PopperJS from 'popper.js'
import * as PropTypes from 'prop-types';

export interface IPopperChildProps {

}

export interface IPopperProps extends PopperJS.PopperOptions {
  componentFactory: (popperProps: IPopperChildProps) => React.ReactNode;
}

export interface IPopperState {
  data: PopperJS.Data | null
}

export class Popper extends React.Component<IPopperProps, IPopperState> {
  static contextTypes = {
    popperManager: PropTypes.object,
  }

  static childContextTypes = {
    popper: PropTypes.object,
  }

  private _popper: PopperJS;
  private _arrowNode: React.ReactNode;
  private _node: Element;

  constructor(props: IPopperProps) {
    super(props);

    this.state = {
      data: null
    };
  }

  getChildContext() {
    return {
      popper: {
        setArrowNode: this._setArrowNode,
        getArrowStyle: this._getArrowStyle,
      },
    }
  }

  shouldComponentUpdate(nextProps: IPopperChildProps, nextState: IPopperState) {
    // TODO if some props change, we should re-render
    if (this.state.data == null && nextState.data == null) {
      return false;
    }
    else if (this.state.data != null && nextState.data != null &&
      JSON.stringify(this.state.data.offsets) !== JSON.stringify(nextState.data.offsets)) {
      return false;
    }
    else {
      return true;
    }
  }

  componentDidUpdate(lastProps: IPopperChildProps) {
    // TODO if any of the popper props change, we should destroy and recreate popper
    // {
    //   this._destroyPopper()
    //   this._createPopper()
    // }

    this._popper.scheduleUpdate();
  }

  componentWillUnmount() {
    this._destroyPopper()
  }

  _setArrowNode = (node: React.ReactNode) => {
    this._arrowNode = node
  }

  _getTargetNode = () => {
    return this.context.popperManager.getTargetNode()
  }

  _isDataDirty = (data: PopperJS.Data) => {
    if (this.state.data) {
      return (
        JSON.stringify(this.state.data.offsets) !== JSON.stringify(data.offsets)
      )
    } else {
      return true
    }
  }

  _updateStateModifier = {
    enabled: true,
    order: 900,
    fn: (data: PopperJS.Data) => {
      if (this._isDataDirty(data)) {
        this.setState({ data })
      }
      return data
    },
  }

  _createPopper() {
    const { componentFactory, children, ...popperProps } = this.props

    this._popper = new PopperJS(this._getTargetNode(), this._node, {
      ...popperProps,
      modifiers: {
        ...popperProps.modifiers,
        applyStyle: { enabled: false },
        updateState: this._updateStateModifier,
        arrow: {
          element: this._arrowNode as any
        }
      },
    })

    // schedule an update to make sure everything gets positioned correctly
    // after being instantiated
    this._popper.scheduleUpdate()
  }

  _destroyPopper() {
    if (this._popper) {
      this._popper.destroy()
    }
  }

  _getArrowStyle = () => {
    if (!this.state.data || !this.state.data.offsets.arrow) {
      return {}
    } else {
      const { top, left } = this.state.data.offsets.arrow
      return { top, left }
    }
  }

  render() {
    const { componentFactory } = this.props

    const popperRef = (node: Element) => {
      this._node = node
      if (node) {
        this._createPopper();
      } else {
        this._destroyPopper();
      }
    }

    return componentFactory({
      style: this.state.data && this.state.data.styles,
      ref: popperRef,
      //['data-placement']: popperPlacement,
      //['data-x-out-of-boundaries']: popperHide,
      scheduleUpdate: () => {
        // _createPopper will scheduleUpdate,
        // so calling this before this._popper exists
        // can be a noop.
        this._popper && this._popper.scheduleUpdate();
      },
    })
  }
}
