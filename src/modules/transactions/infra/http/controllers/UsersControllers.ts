import { FastifyReply, FastifyRequest } from 'fastify';
import XLSX from 'xlsx';

export class TransactionsController {
  constructor() {}

  public async create(request: FastifyRequest, reply: FastifyReply) {
    const data: any[] = [];

    // Receber o arquivo da requisição
    const file = await request.file();
    if (!file) {
      return reply.status(400).send('No file uploaded.');
    }

    try {
    // Ler o buffer do arquivo recebido
      const fileBuffer = await file.toBuffer();

      // Ler o conteúdo do arquivo .xlsx
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

      // Selecionar a primeira planilha
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Converter a planilha para JSON
      const sheetData = XLSX.utils.sheet_to_json(worksheet);

      // Adicionar os dados ao array
      data.push(...sheetData);

      // Enviar resposta com os dados da planilha
      reply.send(data);
    } catch (error) {
      console.error('Error processing file:', error);
      reply.status(500).send('Error processing file');
    }
  }
}
