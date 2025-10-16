# Development helper - packages/nextjs

Steps to run typechecks, build the Next.js app and generate contract ABIs used by the front-end.

1) Install dependencies (root or package-level)

# from project root

yarn install

# or only nextjs
cd packages/nextjs
yarn install

2) Build contracts and generate TypeScript ABIs (Foundry)

cd packages/foundry
forge build
node scripts-js/generateTsAbis.js

The `generateTsAbis.js` script should produce the `deployedContracts.ts` and copy ABI JSONs where needed into `packages/nextjs/contracts`.

3) Install Chainlink (if solidity imports fail)

cd packages/foundry
forge install smartcontractkit/chainlink

4) Build Next.js and run typecheck

cd packages/nextjs
# build and check
yarn build

# or only TypeScript check
yarn tsc -p tsconfig.json --noEmit

Notes:
- After step 2 the `@ts-ignore` and `any` casts added temporarily in `app/page.tsx` can be removed by updating the imports to use the generated `deployedContracts.ts` types and ABI locations.
- If `generateTsAbis.js` doesn't put ABI files in `packages/nextjs/contracts`, copy the generated JSON ABI files manually.
