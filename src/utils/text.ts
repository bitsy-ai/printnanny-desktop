function truncate(str: string, n: number): string {
  return str.slice(0, n) + "..." + str.slice(str.length - n, str.length);
}

export { truncate };
