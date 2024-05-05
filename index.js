"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.derangementCounter = exports.factorial = exports.subFactorial = exports.ithDerangement = void 0;
var js_big_decimal_1 = require("js-big-decimal");
var MINUS_ONE = BigInt(-1);
var ONE = BigInt(1);
var EXP = new js_big_decimal_1.default(Math.exp(1));
function ithDerangement(n, i) {
    var totalDerangements = subFactorial(n);
    // console.log(`totalDerangements for ${n}: ${totalDerangements}`)
    if (i < 1 || i > totalDerangements) {
        console.error('i is out of bounds');
        return [];
    }
    var output = new Array(n);
    var used = new Array(n);
    var dpForDc = [];
    for (var j = 0; j <= n + 1; j++) {
        dpForDc[j] = new Array(n + 1).fill(MINUS_ONE);
    }
    for (var position = 1; position <= n; position++) {
        var frozenFreedom = 0;
        for (var i_1 = 1; i_1 < position; i_1++) {
            if (output[i_1 - 1] > position)
                frozenFreedom++;
        }
        // console.log(`FrozenFreedom for position ${position} and output ${JSON.stringify(output)} = ${frozenFreedom}`)
        for (var testNumber = 1; testNumber <= n; testNumber++) {
            // Derangement definition
            if (position == testNumber || used[testNumber - 1])
                continue;
            var f = frozenFreedom + (testNumber > position ? 1 : 0);
            var g = derangementCounter(n - position, f, dpForDc);
            // const newI = jump(n - position, f, i, dpForDc)
            // console.log(`f = ${f} g = ${g} testNumber = ${testNumber}`)
            if (i > g) {
                i -= Number(g);
                continue;
            }
            output[position - 1] = testNumber;
            used[testNumber - 1] = true;
            // console.log(`i = ${i} output ${JSON.stringify(output)}`)
            break;
        }
    }
    return output;
}
exports.ithDerangement = ithDerangement;
var subFactorialData = {};
// fixme number is running out of capacity
function subFactorial(n) {
    if (n == 0)
        return ONE;
    if (subFactorialData[n])
        return subFactorialData[n];
    // Following function is for n>=1
    subFactorialData[n] = BigInt(new js_big_decimal_1.default(factorial(n) + BigInt(1)).divide(EXP).floor().getValue());
    return subFactorialData[n];
}
exports.subFactorial = subFactorial;
function factorial(n, dp) {
    if (dp === void 0) { dp = {}; }
    if (n == 1 || n == 0)
        return ONE;
    if (dp[n])
        return dp[n];
    dp[n] = BigInt(n) * factorial(n - 1);
    return dp[n];
}
exports.factorial = factorial;
// export function jump(k: number, f: number, i: number, dp: bigint[][]): number {
//
// }
/**
 *
 * @param k
 * @param f
 * @param dp Must be at least (k+f)*(f+1) size matrix of derangementCounts. Row is k and column is f.
 */
function derangementCounter(k, f, dp) {
    // console.log(`dp = ${JSON.stringify(dp)}\nk = ${k}\t f = ${f}`)
    // console.log(`dp[${k}][${f}] = ${dp[k][f]}`)
    if (dp[k][f] != MINUS_ONE)
        return dp[k][f];
    if (f > k || f < 0) {
        throw Error('Invalid f');
    }
    if (f == 0)
        return subFactorial(k);
    // Pattern found through brainstorming on a spreadsheet
    // (K2-J2*($D3-1))/(J$1-$D3+1)
    var rightUp = derangementCounter(k + 1, f - 1, dp);
    var up = derangementCounter(k, f - 1, dp);
    dp[k][f] = (rightUp - up * BigInt(f - 1)) / BigInt(k - f + 1);
    return dp[k][f];
}
exports.derangementCounter = derangementCounter;
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var data, _i, data_1, datum, n, i, timeLabel;
        return __generator(this, function (_a) {
            data = [[5, 19], [50, 1009], [50, 1009], [50, 1009]];
            for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                datum = data_1[_i];
                n = datum[0], i = datum[1];
                timeLabel = "time taken for n = ".concat(n, " and i = ").concat(i);
                console.time(timeLabel);
                ithDerangement(n, i);
                console.timeEnd(timeLabel);
                // }
            }
            return [2 /*return*/];
        });
    });
}
main().then(function () { });
