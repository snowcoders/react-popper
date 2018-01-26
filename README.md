## React Popper - Typescript

React wrapper around [PopperJS](https://github.com/FezVrasta/popper.js/)
Fork of [React-Popper](https://github.com/souporserious/react-popper) and now has the following additional functionality
 - More type-safe than before
 - Allows you to use whatever version of popper.js you want to use
 - Written in typescript so your *.d.ts will be correct
 - Able to install directly from github (though not suggested)
 - Developing is easier
 - Test coverage coming soon!

## Install

`npm install @snowcoders/react-popper --save`

```html
<script src="https://unpkg.com/@snowcoders/react-popper/dist/index.js"></script>
(UMD library exposed as `ReactPopper`)
```

## Usage

```js
import { Manager, Target, Popper, Arrow } from '@snowcoders/react-popper'

const PopperExample = () => (
  <Manager>
      <span>I'm text before the</span>
      {" "}
      <Target componentFactory={(targetProps) => (
          <span {...targetProps}>
              Target Box
          </span>
      )}>
      </Target>
      <Popper
          placement="bottom"
          positionFixed={true}
          componentFactory={(popperProps) => (
              <span {...popperProps}>
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
      {" "}
      <span>for the popover</span>
  </Manager>
)
```

## Running Locally

1. `git clone https://github.com/snowcoders/react-popper`
1. `cd react-popper`
1. `npm install`
1. `npm run start`
