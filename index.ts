export function ithDerangement(n: number, i: number): number[] {
    const totalDerangements = subFactorial(n)
    // console.log(`totalDerangements for ${n}: ${totalDerangements}`)

    if (i < 1 || i > totalDerangements) {
        console.error('i is out of bounds')
        return []
    }

    const output: number[] = new Array(n)
    const used: boolean[] = new Array(n)

    for (let position = 1; position <= n; position++) {
        let frozenFreedom = 0
        for (let i = 1; i < position; i++) {
            if (output[i - 1] > position)
                frozenFreedom++
        }
        // console.log(`FrozenFreedom for position ${position} and output ${JSON.stringify(output)} = ${frozenFreedom}`)
        for (let testNumber = 1; testNumber <= n; testNumber++) {
            // Derangement definition
            if (position == testNumber || used[testNumber - 1])
                continue

            const f = frozenFreedom + (testNumber > position ? 1 : 0)
            const g = derangementCounter(n - position, f)

            // console.log(`f = ${f} g = ${g} testNumber = ${testNumber}`)

            if (i > g) {
                i -= Number(g)
                continue
            }

            output[position - 1] = testNumber
            used[testNumber - 1] = true
            // console.log(`i = ${i} output ${JSON.stringify(output)}`)
            break
        }
    }

    return output
}

const subFactorialCache: { [p: number]: bigint } = {}

/**
 * Calculates the subfactorial of a number using dynamic programming.
 * @param n The number to calculate the subfactorial of.
 */
export function subFactorial(n: number): bigint {
    if (n === 0) return 1n;   // Base case: !0 = 1
    if (n === 1) return 0n;   // Base case: !1 = 0

    if (subFactorialCache[n])
        return subFactorialCache[n]

    // Initialize an array for storing subfactorial results
    subFactorialCache[0] = 1n; // !0
    subFactorialCache[1] = 0n; // !1

    // Compute subfactorial using the DP table
    for (let i = 2; i <= n; i++) {
        subFactorialCache[i] = BigInt(i - 1) * (subFactorialCache[i - 1] + subFactorialCache[i - 2]);
    }

    return subFactorialCache[n];
}

const dcCache: { [k: number]: { [f: number]: bigint } } = {}


/**
 * Calculates derangement values iteratively using dynamic programming.
 * @param maxK The maximum k value to compute values for.
 * @param maxF The maximum f value to compute values for.
 */
function fillDerangementTable(maxK: number, maxF: number): void {
    for (let f = 0; f <= maxF; f++) {
        for (let k = maxK + maxF - f; k >= maxK; k--) {
            if (f > k)
                break

            if (!(k in dcCache))
                dcCache[k] = {}
            else if (f in dcCache[k]) {
                // console.log(`dcCache[${k}][${f}] = ${(dcCache[k][f]).toString()}`)
                continue
            }

            if (f == 0) {
                dcCache[k][f] = subFactorial(k);
                // console.log(`dcCache[${k}][${f}] = ${(dcCache[k][f]).toString()}`)
            } else {
                const rightUp = dcCache[k + 1][f - 1]
                const up = dcCache[k][f - 1]
                dcCache[k][f] = (rightUp - up * BigInt(f - 1)) / BigInt(k - f + 1);
                // console.log(`dcCache[${k}][${f}] = ${(dcCache[k][f]).toString()}`)
            }
        }
    }
}

/**
 * Uses a precomputed table to return the derangement value.
 * @param k
 * @param f
 */
export function derangementCounter(k: number, f: number): bigint {
    if (k in dcCache && f in dcCache[k]) {
        return dcCache[k][f]
    }
    fillDerangementTable(k, f)  // Ensuring the cache is filled up to at least (k, f)
    return dcCache[k][f]
}

async function main() {
    // console.log(Bun.argv)
    // const data = [2, 3, 6, 50, 50, 50, 50];
    //
    // for (let datum of data) {
    //     console.time('subfactorial time')
    //     subFactorial(datum)
    //     console.timeEnd('subfactorial time')
    // }

    // for (let datum of data) {
    let [n, i] = [0, 1]

    while (true) {
        if (Bun.argv.length >= 4)
            [n, i] = [Number(Bun.argv[2]), Number(Bun.argv[3])]
        else {
            let input: string | null = null

            while (!input) {
                input = prompt("n = ")
            }

            n = Number(input)
            input = null

            while (!input) {
                input = prompt("i = ")
            }
            i = Number(input)
        }
        if (n < 1 || i < 1) {
            console.warn('n and i should be greater than 0. Exiting...')
            break
        }
        const timeLabel = `time taken for n = ${n} and i = ${i}`
        console.time(timeLabel)
        console.log(ithDerangement(n, i))
        console.timeEnd(timeLabel)
    }
    // }
}

main().then(() => {
})

