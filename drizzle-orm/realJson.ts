import { customType } from 'drizzle-orm/mysql-core';

// drizzle-orm somehow uses varchar as the data type for json type,
// this replaces the drizzle-orm's `json` function and returns the object instead of string.
export const realJson = <TData>(name: string) => {
  return customType<{ data: TData; driverData: string }>({
    dataType() {
      return 'json';
    },
    toDriver(value: TData): string {
      return JSON.stringify(value);
    },
    fromDriver(value) {
      return value as TData;
    },
  })(name);
};
