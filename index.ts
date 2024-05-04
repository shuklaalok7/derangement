export function ithDerangement(n:number, i:number): number[] {
    const totalDerangements = subFactorial(n)
    console.log(`totalDerangements for ${n}: ${totalDerangements}`)

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
        console.log(`FrozenFreedom for position ${position} and output ${JSON.stringify(output)} = ${frozenFreedom}`)
        for (let testNumber = 1; testNumber <= n; testNumber++) {
            // Derangement definition
            if (position == testNumber || used[testNumber - 1])
                continue

            const f = frozenFreedom + (testNumber > position ? 1 : 0)
            const g = derangementCounter(n - position, f)

            console.log(`f = ${f} g = ${g} testNumber = ${testNumber}`)

            if (i > g) {
                i -= g
                continue
            }

            output[position - 1] = testNumber
            used[testNumber - 1] = true
            console.log(`i = ${i} output ${JSON.stringify(output)}`)
            break
        }
    }

    return output
}

export function calculateFreedom(output: number[], outputIndex: number, testNumber: number): number {
    let f = 0
    for (let i = 1; i < outputIndex; i++) {
        if (output[i] > outputIndex)
            f++
    }
    if (testNumber > outputIndex)
        f++
    return f
}

export function subFactorial(n:number): number {
    if (n == 0)
        return 1
    // Following function is for n>=1
    return Math.floor((factorial(n)+1)/Math.exp(1))
}


export function factorial(n: number): number {
    if(n == 1 || n == 0)
        return 1
    return n*factorial(n-1)
}

export function derangementCounter(k: number, f: number): number {
    if (f > k || f < 0) {
        throw Error('Invalid f')
    }
    if (f == 0)
        return subFactorial(k)
        // (K2-J2*($D3-1))/(J$1-$D3+1)
    const rightUp = derangementCounter(k+1, f-1)
    const up = derangementCounter(k, f-1)
    return (rightUp - up*(f-1))/(k-f+1)
}

// ithDerangement(1, 1);
