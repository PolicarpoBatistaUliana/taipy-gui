import React from "react";
import {render} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

import NavBar from './NavBar';
import { LoV } from "./lovUtils";
import { TaipyImage } from "./utils";
import { INITIAL_STATE, TaipyState } from "../../context/taipyReducers";
import { TaipyContext } from "../../context/taipyContext";

const lov: LoV = [
    ["id1", "Item 1"],
    ["id2", "Item 2"],
    ["id3", "Item 3"],
    ["id4", "Item 4"],
];
const defLov = '[["id10","Default Item"]]';

const imageItem: [string, string | TaipyImage] = ["ii1", {path:"/img/fred.png", text: "Image"}];

describe("NavBar Component", () => {
    it("renders", async () => {
        const {getByText} = render(<BrowserRouter><NavBar lov={lov} /></BrowserRouter>);
        const elt = getByText("Item 1");
        expect(elt.tagName).toBe("BUTTON");
    })
    it("uses the class", async () => {
        const {getByText} = render(<BrowserRouter><NavBar lov={lov} className="taipy-navbar" /></BrowserRouter>);
        const elt = getByText("Item 1");
        expect(elt.parentElement?.parentElement?.parentElement?.parentElement).toHaveClass("taipy-navbar");
    })
    it("displays the right info for lov vs defaultLov", async () => {
        const { getByText, queryAllByText } = render(<BrowserRouter><NavBar lov={lov} defaultLov={defLov} /></BrowserRouter>);
        getByText("Item 1");
        expect(queryAllByText("Default Item")).toHaveLength(0);
    });
    it("displays the default LoV", async () => {
        const { getByText } = render(<BrowserRouter><NavBar lov={undefined as unknown as []} defaultLov={defLov} /></BrowserRouter>);
        getByText("Default Item");
    });
    it("is disabled", async () => {
        const { getAllByRole } = render(<BrowserRouter><NavBar lov={lov} active={false} /></BrowserRouter>);
        const elts = getAllByRole("tab");
        elts.forEach(elt => expect(elt).toBeDisabled());
    });
    it("is enabled by default", async () => {
        const { getAllByRole } = render(<BrowserRouter><NavBar lov={lov} /></BrowserRouter>);
        const elts = getAllByRole("tab");
        elts.forEach(elt => expect(elt).not.toBeDisabled());
    });
    it("is enabled by active", async () => {
        const { getAllByRole } = render(<BrowserRouter><NavBar lov={lov} active={true} /></BrowserRouter>);
        const elts = getAllByRole("tab");
        elts.forEach(elt => expect(elt).not.toBeDisabled());
    });
    it("dispatch a well formed message", async () => {
        const focusSpy = jest.fn()
        window.open = jest.fn().mockReturnValue({ focus: focusSpy })
        const { getByText } = render(<BrowserRouter><NavBar lov={lov}/></BrowserRouter>);
        const elt = getByText("Item 1");
        userEvent.click(elt);
        expect(focusSpy).toHaveBeenCalled();
    });
    it("shows a default list when no lov", async () => {
        const dispatch = jest.fn();
        const state: TaipyState = {...INITIAL_STATE, locations: {"/": "/routeloc", "/page1": "/loc1", "/page2": "/loc2"}};
        const { getByText, queryAllByRole } = render(<TaipyContext.Provider value={{ state, dispatch }}>
                <BrowserRouter><NavBar lov={undefined as unknown as LoV}/></BrowserRouter>
            </TaipyContext.Provider>);
        const elt = getByText("loc1");
        const elt2 = getByText("loc2");
        expect(queryAllByRole("tab")).toHaveLength(2);
    });
});
