export interface PixDTO {
  id: string;
  code: string;
  status:
    | 'ATIVA'
    | 'CONCLUIDA'
    | 'REMOVIDA_PELO_USUARIO_RECEBEDOR'
    | 'REMOVIDA_PELO_PSP';
  created_at: string;
  expiration: string;
}
