# Problem 4 - Sum to N

## Overview

This is my solution for **Problem 4 - Sum to N**.

The goal is to calculate the sum of all numbers from `1` to `n`. I tried different approaches to handle both small and large values of `n`, especially cases where `n` is close to `Number.MAX_SAFE_INTEGER`.

---

## Assumptions

- If `n` is negative (`n < 0`), I assume it's invalid and return `-1`.
- If `n` is `0`, the sum is `0`.

---

## Notes

For very large values close to `Number.MAX_SAFE_INTEGER`, there may be a slight loss of precision and a lot of time spent in JavaScript.

---

## Solution Details

### Solution 1 - Math Formula

#### Explanation

- This is the most straightforward way.
- Using the formula:  
   \[
  sum = \frac{n \cdot (n + 1)}{2}
  \]
- Runs in **constant time**: `O(1)`

#### When to use

- Works well for small and large numbers.
- With extremely large `n`, JavaScript's number precision could be a problem.

---

### Solution 2 - Loop

#### Explanation

- A simple `for` loop to add numbers from `1` to `n`.
- Time complexity: **O(n)**

#### When to use

- Works fine for small and medium `n`.
- May be slow for very large `n` (e.g., greater than 10 million).

---

### Solution 3 - Recursive with Chunking

#### Explanation

- For `n < 100,000`, basic recursion is used.
- For larger `n`, the range is split into smaller **chunks**, with size based on the square root of `n`.
- Each chunk is summed using a recursive function to reduce recursion depth.

#### Why use chunking?

- Direct recursion on large `n` can cause **stack overflow**.
- Dividing into smaller chunks reduces this risk.

#### Time complexity

- Overall: **O(n)**.
- More memory-efficient for very large `n`.

---

## Run Instructions

1. Install dependencies if needed:
   ```bash
   npm install
   ```
2. Run the solution:
   ```bash
   npm start
   ```

---
