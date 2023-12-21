export default interface UserDTO {
  A1_NOME: string;
  CODIGO: string; // cpf ou cnpj
  A1_NREDUZ: string;
  A1_FILIAL: string;
  A1_CONTATO: string;
  A1_CGC: string; // cpf ou apenas o codgio do cnpj
  A1_LOJA: string; // 0000 ou loja do cnpj
  A1_CEP: string;
  A1_MUN: string;
  A1_ZMAILRE: string;
  A1_GRPVEN: string;
  A1_EST: string;
  A1_ENDCOB: string;
  A1_COMPLEM: string;
  A1_TABELA: string; // tabela de preco
  A1_VEND: string; // grupo de vendedores
  A1_EMAIL: string;
  A1_ZCELULA: string;
  A1_ZBLQGRP: string;
  A1_GRPTRIB: string;
  A1_TIPO: string;
  A1_MSBLQL: '1' | '2'; // 2 = ativo, 1 = inativo
  A1_TEL: string;
  A1_ZCMMKT: string;
  EMPRESA: string;
  FILIAL: string;
  A1_DDD: string;
  A1_ZCKALV1: string;
  A1_ZCKALV2: string;
  A1_ZCKALV3: string;
  A1_COD_MUN: string;
  A1_ZDTALV1: string;
  A1_ZDTALV2: string;
  A1_ZDTALV3: string;
  A1_BITMAP1: string;
  A1_BITMAP2: string;
  A1_BITMAP3: string;
  A1_BITMAP4: string;
  A1_ZNMALV1: string;
  A1_ZNMALV2: string;
  A1_ZNMALV3: string;
  A1_ZBLQPOR: string;
  VENCFINA: string;
  A1_COND: string;
  A1_ZCONDCC: string;
  A1_ZCOND: string;
  A1_ZCONDCP: string;
  A1_BAIRRO: string;
  A1_ZGRPCLI: string;
  A1_PESSOA: string;
  A1_DTCAD: string;
  A1_LC: string;
  A1_ZMESRE: string;
  A1_ZMICRE: string;
  A1_ZREGIA: string;
  ZZ8_SETOR: string;
  ZZ8_SETSUP: string;
  CC2_ZREGIA?: string;
  CC2_ZMESRE?: string;
  CC2_ZMICRE?: string;
  ORIGN: 'portaldocliente';
}
