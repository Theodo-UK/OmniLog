import "@testing-library/jest-dom";
import { formatCostToString } from "../formatCost";

describe("formatCostToString", () => {
    it("should return a string with the cost in USD with cents", () => {
        const cost = 100;
        const costString = formatCostToString(cost);
        expect(costString).toEqual("100.00");
    }
    );
    it("should return 0.00 if the cost is 0", () => {
        const cost = 0;
        const costString = formatCostToString(cost);
        expect(costString).toEqual("0.00");
    }
    );
    it("should keep at least two decimals", () => {
        const cost = 1;
        const costString = formatCostToString(cost);
        expect(costString).toEqual("1.00");
    }
    );
    it("should write thousands with a k", () => {
        const cost = 1000;
        const costString = formatCostToString(cost);
        expect(costString).toEqual("1.00k");
    }
    );
    it("should round number to the nearest 0.0001", () => {
        const cost = 1.00004;
        const costString = formatCostToString(cost);
        expect(costString).toEqual("1.00");
    }
    );
    it("should add a star if the cost is rounded to zero", () => {
        const cost = 0.000004;
        const costString = formatCostToString(cost);
        expect(costString).toEqual("0.00*");
    }
    );
    it("should return a dash if the cost is null", () => {
        const cost = null;
        const costString = formatCostToString(cost);
        expect(costString).toEqual("-");
    }
    );
}
);
