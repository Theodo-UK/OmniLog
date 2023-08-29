import "@testing-library/jest-dom";

jest.mock("@services/LogsData.ts", () => ({
    getLogs: jest.fn(() => Promise.resolve([])),
}));

describe("Home", () => {
    it("temporary test to check CI testing", async () => {
        expect(1).toEqual(1);
    });
});
