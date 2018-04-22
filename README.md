[![npm (scoped)](https://img.shields.io/npm/v/@snowcoders/react-popper.svg)](https://www.npmjs.com/package/@snowcoders/react-popper) 
[![CircleCI branch](https://img.shields.io/circleci/project/github/snowcoders/react-popper.svg)](https://circleci.com/gh/snowcoders/react-popper)

## Future development notice

The successor to [react-popper](https://github.com/FezVrasta/react-popper) (currently in beta) resolves many of the issues why this repository was initially forked. Once react-popper reaches a major verson, this repository will be deprecated. Until it comes out of beta, support for this repo will be provided for any and all issues.

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
`npm install popper.js[@version-of-choice] --save`

```html
<script src="https://unpkg.com/@snowcoders/react-popper/dist/index.js"></script>
(UMD library exposed as `ReactPopper`)
```

## Usage

See our [example](./example/) for more details

```js
import { Manager, Target, Popper, Arrow } from '@snowcoders/react-popper'

const PopperExample = () => (
    <Manager>
        <div>
            <span>I am text before the</span>{" "}
            <Target
                componentFactory={(targetProps) => (
                    <span {...targetProps}>
                        Target Box
                    </span>
                )}
            />
            <Popper
                placement="right"
                componentFactory={(popperProps) => (
                    <span {...popperProps}>
                        I am the tooltip
                        <Arrow
                            componentFactory={(arrowProps) => (
                                <span {...arrowProps} />
                            )}
                        />
                    </span>
                )}
            />{" "}
            <span>for the popover</span>
        </div>
    </Manager>
)
```

## Running Locally

1. `git clone https://github.com/snowcoders/react-popper`
1. `cd react-popper`
1. `npm install`
1. `npm run start`
