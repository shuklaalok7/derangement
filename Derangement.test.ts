import {derangementCounter, ithDerangement, subFactorial} from "./index";
import {describe, expect, test} from "bun:test";

const ithDerangementTestData: [number, number, number[]][] = [
    [2, 1, [2, 1]],
    [3, 2, [3, 1, 2]],
    [4, 5, [3, 4, 1, 2]],
    [6, 78, [3, 4, 6, 5, 2, 1]]
]

const derangementCounterTestData: [number, number, bigint][] = [
    [4, 0, 9n],
    [4, 1, 11n],
    [5, 3, 78n],
    [6, 2, 362n],
    [4, 4, 24n]
]

const subfactorialTestData: [number, bigint][] = [
    [0, 1n],
    [1, 0n],
    [2, 1n],
    [3, 2n],
    [4, 9n],
    [5, 44n],
    [13, 2290792932n]
]

describe("tests", () => {
    test.each(ithDerangementTestData)("ithDerangement for n = %i and i = %i should be %o", (n, i, output) => {
        expect(ithDerangement(n, i)).toEqual(output);
    })

    test.each(derangementCounterTestData)("DerangementCounter for k = %i and f = %i", (k, f, output) => {
        expect(derangementCounter(k, f)).toEqual(output)
    })

    test.each(subfactorialTestData)("subfactorial for n = %i", (n, output) => {
        expect(subFactorial(n)).toEqual(output)
    })
});
