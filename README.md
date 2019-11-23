# HC-Core-Module

Home Credit Core Module - consisting of Home Credit's predicted value in determining user significant values for standard loan and AI applied towards defining user's credential score

# API Reference (Cellphone) HC.Cellphone

- Take note the maximum input for cellphone price is 50,000 and minimum's at 3340 unit in peso
- There are only 3 valid months for users to avail, 9,18, 24 Months

### 1. How to use the Home Credit calculation module (importing)

- `import { HC } from '/path/to/this/project'`

### 2. HC.Cellphone.getMaxDPFromPrice <async> Parameters - (price<number>)

- `returns <Object>, field { result<number>, status: <bool>}`
- `status is expected to be true when value returned is true prositive, otherwise false`

### 3. HC.Cellphone.getMinDPFromPrice <async> Parameters - (price<number>)

- `returns <Object>, field { result<number>, status: <bool>}`
- `status is expected to be true when value returned is true prositive, otherwise false`

### 4. HC.Cellphone.getMonthRangeFromPrice <sync> Parameters - (price<number>)

- `returns array of values<number> for the valid months for the users to avail`
- `ex. [9,18,24]`

### 5. HC.Cellphone.getMonthly <sync> Parameters - (price<number>,down-payment<number>, months-to-pay<number>, maxDownPayment<number>, minDownPayment<number>)

- `Strict rules:`

  - `Please do not pass down payment lesser than the minimum downpayment from API (getMinDPFromPrice)`
  - `Same goes for maximum down payment, no downpayment shall go beyond this value`
  - `Month should only be among 9,18,24 months`

- `returns <Object>, field { result<number>, status: <bool>}`
- `status is expected to be true when value returned is true prositive, otherwise false`

### 6. Error returns

- `return { status: false, result: 0 };`
- `status is expected to be false and result is always zero`
