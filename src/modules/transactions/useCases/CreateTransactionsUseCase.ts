import formidable from 'formidable';
import * as XLSX from 'xlsx';
import { ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';

export class CreateTransactionsUseCase {
  constructor(
    private usersRepository: ITransactionsRepository,
  ) {}

  public async execute(): Promise<void> {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
    /* grab the first file */
      const f = Object.entries(files)[0][1];
      const path = f.filepath;
      const workbook = XLSX.readFile(path);

    /* DO SOMETHING WITH workbook HERE */
    });
  }
}
