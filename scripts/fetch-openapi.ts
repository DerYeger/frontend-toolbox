/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="bun" />

const response = await fetch('https://raw.githubusercontent.com/github/rest-api-description/refs/heads/main/descriptions/api.github.com/api.github.com.json')

if (!response.ok) {
  console.error(`Failed to fetch GitHub OpenAPI: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const responseText = (await response.text()).replaceAll('release/*/*', 'release/*')

const openapiDescription = prunePaths(JSON.parse(responseText))

const outputPath = './api/github.json'
await Bun.write(outputPath, JSON.stringify(openapiDescription, null, 2));

console.log(`Saved GitHub OpenAPI to ${outputPath}`);

function prunePaths(openapiDescription: any) {
  const prunedPaths = Object.entries(openapiDescription.paths ?? {})
    .flatMap(([path, methods]) => {
      const prunedMethods = Object
        .entries(methods as Record<string, any>)
        .filter(([, methodData]) => methodData.operationId === 'users/get-by-username')
      if (prunedMethods.length === 0) {
        return []
      }
      return [[path, Object.fromEntries(prunedMethods)]]
    }).filter(Boolean)
  return {
    ...openapiDescription,
    paths: Object.fromEntries(prunedPaths)
  }
}

export { }
