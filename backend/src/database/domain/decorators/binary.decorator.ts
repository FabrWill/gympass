import { Column, ColumnOptions } from 'typeorm';

export function BinaryColumn(options: ColumnOptions) {
  return Column({
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        if (!value) return '';

        return value.toString();
      },
    },
    ...options,
  });
}
