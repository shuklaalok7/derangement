import {derangementCounter, ithDerangement, subFactorial} from "./index";
import {describe, expect, test} from "bun:test";
import {factorial, ithOddEvenDerangement} from "./odd-even.ts";

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

const factorialData: [number, bigint][] = [
    [4, 24n],
    [5, 120n],
    [50, 30414093201713378043612608166064768844377641568960512000000000000n]
]

const oddEvenDerangementData: [number, number, number[]][] = [
    [2, 1, [2, 1]],
    [4, 4, [4, 3, 2, 1]],
    [6, 35, [6, 5, 4, 1, 2, 3]]
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

describe("odd-even", () => {
    test.each(factorialData)("factorial for n = %i", (n, output) => {
        expect(factorial(n)).toEqual(output)
    })

    test.each(oddEvenDerangementData)("ith Derangement with odd-even constraint for n = %i and i = %i should be %o", (n, i, output) => {
        expect(ithOddEvenDerangement(n, i)).toEqual(output)
    })
})
