import {derangementCounter, ithDerangement} from "./index";

const testData = [
    {n: 2, i: 1, output: [2, 1]},
    {n: 3, i: 2, output: [3, 1, 2]},
    {n: 4, i: 5, output: [3, 4, 1, 2]},
    {n: 6, i: 78, output: [3, 4, 6, 5, 2, 1]}
]

const tests = {

    testMain: () => {
        for (let datum of testData) {
            const o = ithDerangement(datum.n, datum.i)
            if (o !== datum.output) {
                console.error('Output: ' + JSON.stringify(o) + ', Expected output: ' + JSON.stringify(datum.output));
            }
        }
    },

    testDerangementCounter: () => {
        const data = [
            {k: 4, f: 0, output: 9},
            {k: 4, f: 1, output: 11},
            {k: 5, f: 3, output: 78},
            {k: 6, f: 2, output: 362},
            {k: 4, f: 4, output: 24}
        ]
        for (let d of data) {
            const o = derangementCounter(d.k, d.f)
            if (o !== d.output)
                console.error(`Output: ${o} Expected output: ${d.output}`)
        }

    }
}

tests.testMain()
// tests.testDerangementCounter()
