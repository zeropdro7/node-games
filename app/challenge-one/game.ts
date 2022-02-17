const m: number[] = [2, 5, 8, 13, 0];
const n: number = 13;

/**
 * Sum all couple of elements from the array input and validate that matches the second paramether.
 * @param {number[]} a Not empty array of integers.
 * @param {number} b Integer with a posible solution.
 * @returns Print the first array solution.
 */
const firstChallengeFunctionTS = (a: number[], b: number) => {
  if (m.length == 0) {
    throw new Error(`You must enter a not empty array.`);
  } else {
    for (let i: number = 0; i < a.length - 1; i++) {
      for (let j: number = 0; j < a.length - 1; j++) {
        if (a[i] + a[i + j] == b && a[i] != a[i + j]) {
          let res: number[] = [a[i], a[i + j]];
          return console.log(res);
        }
      }
    }
  }
};
firstChallengeFunctionTS(m, n);
