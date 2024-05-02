import { inspect } from "node:util";

export function logDeepObject(object: Record<any, any>) {
  // eslint-disable-next-line no-console
  console.log(
    inspect(object, { showHidden: false, depth: null, colors: true }),
  );
}
