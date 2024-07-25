export function getStackDetails(stack: string) {
  if (!stack) return {};
  const stackLines = stack.split('\n');
  const details = stackLines.map(line => {
    const match = line.match(/at (\S+) \((.+):(\d+):(\d+)\)/);
    if (match) {
      return {
        functionName: match[1],
        fileName: match[2],
        timeStamp: new Date().toString(),
      };
    } else {
      return null;
    }
  }).filter(Boolean);
  return details;
}

