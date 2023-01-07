export type ValueOf<T> = T extends unknown[] ? T[number] : T[keyof T];

export type ArgsType<T> = T extends (...args: infer U) => unknown ? U : never;

export type FirstArgument<T> = T extends (
  arg1: infer U,
  ...args: unknown[]
) => unknown
  ? U
  : unknown;

export type SecondArgument<T> = T extends (
  arg1: FirstArgument<keyof T>,
  arg2: infer U,
  ...args: unknown[]
) => unknown
  ? U
  : unknown;

export const keys = <T>(input: T) => Object.keys(input as any) as (keyof T)[];
export const values = <T>(input: T) =>
  Object.values(input as any) as ValueOf<T>[];

export type NonNullableSome<T, K extends keyof T> = T & {
  [key in K]-?: NonNullable<T[K]>;
};

// why not isError? to differ from other implementations that are incorrect (provides instanceof check which is insufficient)
export function isErrorLike(error: unknown): error is Error {
  return typeof error === 'object' && error !== null && 'message' in error;
}
