import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string;
    transactionData: ICreateTransaction[];
    fileName: string;
  }
}
