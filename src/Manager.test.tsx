import * as React from "react";

import { Manager } from "./Manager";

import { expect } from "chai";
import { shallow, configure } from "enzyme";

// Configure enzyme
import * as Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });

describe("Manager", () => {
    it("Render", () => {
        let wrapper = shallow(<Manager />);
        expect(wrapper).to.have.length(1);
    });
});
