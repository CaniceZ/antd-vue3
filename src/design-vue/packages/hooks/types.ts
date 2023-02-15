export type FunctionArgs<Args extends any[] = any[], Return = any> = (
  ...args: Args
) => Promise<Return>
