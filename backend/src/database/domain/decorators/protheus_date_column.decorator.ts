import { Column, ColumnOptions } from 'typeorm';
import { DateTime } from 'luxon';

export function ProtheusDateColumn(options: ColumnOptions) {
  return Column({
    transformer: {
      to(value) {
        if (!value) return '';

        return DateTime.fromISO(value).toFormat('yyyyMMdd');
      },
      from(value) {
        if (!value?.trim()) return null;

        return DateTime.fromFormat(value, 'yyyyMMdd').toFormat('yyyy-MM-dd');
      },
    },
    ...options,
  });
}
