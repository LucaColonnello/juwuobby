export default function waitFor(ms: number = 1000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
