import {derangementCounter, ithDerangement} from "./index";
import {describe, expect, test} from "bun:test";

const ithDerangementTestData: [number, number, number[]][] = [
    [2, 1, [2, 1]],
    [3, 2, [3, 1, 2]],
    [4, 5, [3, 4, 1, 2]],
    [6, 78, [3, 4, 6, 5, 2, 1]]
]

const derangementCounterTestData = [
    [4, 0, 9],
    [4, 1, 11],
    [5, 3, 78],
    [6, 2, 362],
    [4, 4, 24]
]

describe("tests", () => {
    test.each(ithDerangementTestData)("ithDerangement for n = %i and i = %i should be %o", (n, i, output) => {
        expect(ithDerangement(n, i)).toEqual(output);
    })

    test.each(derangementCounterTestData)("DerangementCounter for k = %i and f = %i should be %i", (k, f, output) => {
        const dpForDc: number[][] = []
        for (let j = 0; j <= k + f; j++) {
            dpForDc[j] = new Array(f + 1).fill(-1)
        }

        expect(derangementCounter(k, f, dpForDc)).toEqual(output)
    })
});
