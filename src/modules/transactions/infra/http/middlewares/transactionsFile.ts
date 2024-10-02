import { ICreateTransaction } from '@modules/transactions/domain/models/ICreateTransaction';
import { AppError } from '@shared/errors/AppError';
import { FastifyReply, FastifyRequest } from 'fastify';
import path from 'node:path';
import XLSX from 'xlsx';

export async function transactionFileMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const data: ICreateTransaction[] = [];

  const file = await request.file();

  if (!file) {
    throw new AppError('File not found', 400);
  }

  if (path.extname(file?.filename) !== '.xlsx') {
    throw new AppError('Format not allowed', 400);
  }

  try {
    const fileBuffer = await file.toBuffer();

    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const sheetData: ICreateTransaction[] = XLSX.utils.sheet_to_json(worksheet);

    if (sheetData.length > 500) {
      return reply.code(400).send({
        message: 'File must contain up to 500 transactions',
      });
    }

    data.push(...sheetData);

    request.transactionData = sheetData;
    request.fileName = file.filename;
  } catch {
    return reply.code(400);
  }
}
