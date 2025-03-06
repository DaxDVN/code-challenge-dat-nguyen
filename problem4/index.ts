// assume that if n < 0 then return -1

// solution 1: use math formula
// efficience: very fast with formula
// O(1)
function sum_to_n_a(n: number): number {
  if (n < 0) return -1;
  return (n * (n + 1)) / 2;
}

// solution 2: use simple loop (iteration)
// efficience: linear time, straightforward but slow for very large n
// O(n)
function sum_to_n_b(n: number): number {
  if (n < 0) return -1;
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// solution 3: use simple recursive or recursive sqrt chunk division
// efficience: if n < 100000 then use simple recursion, otherwise use sqrt chunk division to prevent stack overflow
// O(n) with chunked recursion
function sum_to_n_c(n: number): number {
  if (n < 0) return -1;
  if (n === 0) return 0;
  if (n === 1) return 1;

  if (n < 100000) {
    // use simple recursion for smaller n
    return n + sum_to_n_c(n - 1);
  } else {
    // limit chunk size to prevent stack overflow
    const MAX_CHUNK_SIZE = 99999;

    // calculate sum directly for a small range using recursion
    function sumRangeRecursive(start: number, end: number): number {
      if (start > end) return 0;
      return start + sumRangeRecursive(start + 1, end);
    }

    // use sqrt chunking to split large range into smaller parts
    function sqrtChunkSum(start: number, end: number): number {
      const length = end - start + 1;

      if (length <= MAX_CHUNK_SIZE) {
        // for small enough range, use recursive sumRange
        return sumRangeRecursive(start, end);
      }

      const sqrtChunks = Math.ceil(Math.sqrt(length));
      const chunkSize = Math.ceil(length / sqrtChunks);

      let totalSum = 0;
      let i = 0;

      while (i < sqrtChunks) {
        const chunkStart = start + i * chunkSize;
        const chunkEnd = Math.min(start + (i + 1) * chunkSize - 1, end);

        totalSum += sqrtChunkSum(chunkStart, chunkEnd);

        i++;
      }

      return totalSum;
    }

    return sqrtChunkSum(1, n);
  }
}


const test1: number = 100000;
const test2: number = 0;
const test3: number = -100;
const test4: number = Number.MAX_SAFE_INTEGER - 1;

function testResult(n: number): void {
  console.log(`Testing for n = ${n}`);
  console.log(sum_to_n_a(n));
  console.log(sum_to_n_b(n));
  console.log(sum_to_n_c(n));
  console.log('-------------------------------------------');
}

testResult(test1);

testResult(test2);

testResult(test3);

testResult(test4);
