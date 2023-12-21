import { Column, ColumnOptions } from 'typeorm';
import { DateTime } from 'luxon';

export function VarcharToIsoColumn(options: ColumnOptions) {
  return Column({
    transformer: {
      to(value: Date) {
        if (!value) return '';

        const result = DateTime.fromJSDate(value).toISO();

        return result;
      },
      from(value: string) {
        if (!`${value}`?.trim()) return null;

        return DateTime.fromISO(value);
      },
    },
    ...options,
  });
}
