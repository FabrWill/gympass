export default class Mask {
  /**
   * Aplica uma mascara de formatação a uma string de valor.
   *
   * A máscara e uma string onde cada caractere '#' sera substituído
   * por um caractere do valor. Caracteres que não sao '#'
   * serao mantidos como estao na string final.
   *
   * @param {string} mask - A mascara de formatacao a ser aplicada.
   * @param {string} value - O valor a ser formatado.
   * @returns {string} O valor formatado conforme a mascara.
   */
  static apply(mask: string, value: string): string {
    let result = '';
    let valueIndex = 0;

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === '#' && valueIndex < value.length) {
        result += value[valueIndex];
        valueIndex++;
      } else if (mask[i] !== '#') {
        result += mask[i];
      }
    }

    if (valueIndex < value.length) {
      result += value.substring(valueIndex);
    }

    return result;
  }

  /**
   * Metodo utilizado para a formatacao de CPF ou CNPJ
   * utilizado nos campos CGC do protheus
   *
   * @param {string} value
   * @returns {string} o valor formatado com caracteres especiais
   */
  static getFormattedCpfOrCnpj(value: string) {
    const cgc = value.trim();

    if (cgc.length === 11) {
      return this.apply('###.###.###-##', cgc);
    } else if (cgc.length === 14) {
      return this.apply('##.###.###/####-##', cgc);
    }
  }
}
