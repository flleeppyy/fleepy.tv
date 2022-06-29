// https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/

export const asyncFilter = async (arr: any[], predicate: (value: any, index: number, array: any[]) => unknown) => {
  const results = await Promise.all(arr.map(predicate));

  return arr.filter((_v: any, index: string | number) => results[index]);
}
