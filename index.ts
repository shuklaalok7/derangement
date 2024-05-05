export function ithDerangement(n: number, i: number): number[] {
    const totalDerangements = subFactorial(n)
    console.log(`totalDerangements for ${n}: ${totalDerangements}`)

    if (i < 1 || i > totalDerangements) {
        console.error('i is out of bounds')
        return []
    }

    const output: number[] = new Array(n)
    const used: boolean[] = new Array(n)
    const dpForDc: number[][] = []
    for (let j = 0; j <= n + 1; j++) {
        dpForDc[j] = new Array(n + 1).fill(-1)
    }
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
            const g = derangementCounter(n - position, f, dpForDc)

            // console.log(`f = ${f} g = ${g} testNumber = ${testNumber}`)

            if (i > g) {
                i -= g
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

const subFactorialData: { [p: number]: number } = {}

// fixme number is running out of capacity
export function subFactorial(n: number): number {
    if (n == 0)
        return 1
    if (subFactorialData[n])
        return subFactorialData[n]
    // Following function is for n>=1
    subFactorialData[n] = Math.floor((factorial(n) + 1) / Math.exp(1))
    return subFactorialData[n]
}

export function factorial(n: number, dp: { [p: number]: number } = {}): number {
    if (n == 1 || n == 0)
        return 1
    if (dp[n])
        return dp[n]
    dp[n] = n * factorial(n - 1)
    return dp[n]
}

/**
 *
 * @param k
 * @param f
 * @param dp Must be at least (k+f)*(f+1) size matrix of derangementCounts. Row is k and column is f.
 */
export function derangementCounter(k: number, f: number, dp: number[][]): number {
    // console.log(`dp = ${JSON.stringify(dp)}\nk = ${k}\t f = ${f}`)
    // console.log(`dp[${k}][${f}] = ${dp[k][f]}`)
    if (dp[k][f] != -1)
        return dp[k][f]

    if (f > k || f < 0) {
        throw Error('Invalid f')
    }
    if (f == 0)
        return subFactorial(k)
    // Pattern found through brainstorming on a spreadsheet
    // (K2-J2*($D3-1))/(J$1-$D3+1)
    const rightUp = derangementCounter(k + 1, f - 1, dp)
    const up = derangementCounter(k, f - 1, dp)
    dp[k][f] = (rightUp - up * (f - 1)) / (k - f + 1)
    return dp[k][f]
}

async function main() {
    // console.log(Bun.argv)
    let [n, i] = [0, 0]
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
    const timeLabel = `time taken for n = ${n} and i = ${i}`
    console.time(timeLabel)
    ithDerangement(n, i)
    console.timeEnd(timeLabel)
}

await main()

