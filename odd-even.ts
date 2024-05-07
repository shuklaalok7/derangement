export function ithOddEvenDerangement(n: number, i: number): number[] {
    if (n % 2)
        throw new Error('n must be even')
    const halfN = n / 2
    const totalDerangements = factorial(halfN) * factorial(halfN)
    // console.log(`totalDerangements for ${n}: ${totalDerangements}`)

    if (i < 1 || i > totalDerangements) {
        console.error('i is out of bounds')
        return []
    }

    const output: number[] = new Array(n)
    const used: boolean[] = new Array(n)

    for (let position = 1; position <= n; position++) {
        const g = jumpCounter(halfN, position)

        // If there is a sorted set available to hold sorted unused test-numbers, we can lock the next number in single-shot.
        for (let testNumber = 1 + position % 2; testNumber <= n; testNumber += 2) {
            // Derangement definition
            if (used[testNumber - 1])
                continue

            if (i > g) {
                i -= Number(g)
                continue
            }

            output[position - 1] = testNumber
            used[testNumber - 1] = true
            break
        }
    }

    return output
}


const factorialCache: { [p: number]: bigint } = {0: 1n, 1: 1n}

export function factorial(n: number): bigint {
    if (factorialCache[n])
        return factorialCache[n]

    for (let i = 2; i <= n; i++) {
        factorialCache[i] = factorialCache[i - 1] * BigInt(i)
    }

    return factorialCache[n]
}

/**
 *
 * @param halfN
 * @param position
 */
export function jumpCounter(halfN: number, position: number) {
    const halfPosition = Math.floor(position / 2)
    return factorial(halfN - halfPosition - position % 2) * factorial(halfN - halfPosition)
}

async function main() {
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
            if (n % 2) {
                console.warn('n must be even')
                continue
            }

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
        const timeLabel = `time taken for odd-even derangement with n = ${n} and i = ${i}`
        console.time(timeLabel)
        console.log(ithOddEvenDerangement(n, i))
        // ithOddEvenDerangement(n, i)
        console.timeEnd(timeLabel)
    }
    // }
}

main().then(() => {
})
