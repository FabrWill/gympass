import { Column, ColumnOptions } from 'typeorm';

export function ProtheusColumn(options: ColumnOptions) {
  return Column({
    transformer: {
      to(value) {
        if (!value && options.default) return options.default;

        return value;
      },
      from(value) {
        if (!value) return null;

        return value.trim();
      },
    },
    ...options,
  });
}

export function ProtheusIntColumn(options: ColumnOptions) {
  return Column({
    transformer: {
      to(value) {
        if (!value && options.default) return options.default;

        return value;
      },
      from(value) {
        if (!value) return 0;

        const serialized = Number.parseInt(value);

        return Number.isNaN(serialized) ? 0 : serialized;
      },
    },
    ...options,
  });
}

export function ProtheusVarBinaryColumn(options: ColumnOptions) {
  return Column({
    type: 'varbinary',
    length: 'max',
    transformer: {
      to: (value) => Buffer.from(value ?? '', 'utf8'),
      from(value) {
        if (!value) return null;

        return value.toString('utf8');
      },
    },
    ...options,
  });
}
