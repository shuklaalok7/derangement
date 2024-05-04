import {Memoize} from "typescript-memoize";

export function ithDerangement(n:number, i:number): number[] {
    const o: number[] = []
    return o
}


export function subFactorial(n:number): number {
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

ithDerangement(1, 1);
