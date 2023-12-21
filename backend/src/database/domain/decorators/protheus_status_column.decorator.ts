import { Column, ColumnOptions } from 'typeorm';

export function ProtheusStatusColumn(options: ColumnOptions) {
  return Column({
    transformer: {
      to(value) {
        if (value == 'active') {
          return '2';
        }

        if (value == 'inactive') {
          return '1';
        }

        return value;
      },
      from(value) {
        switch (value) {
          case '1':
            return 'inactive';

          default:
            return 'active';
        }
      },
    },
    ...options,
  });
}
