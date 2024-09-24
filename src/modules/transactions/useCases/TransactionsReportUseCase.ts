import { formatCurrency } from '@shared/utils/formatCurrency';
import { ITransactionReportRequest } from '../domain/models/ITransactionReportRequest';
import { ITransactionsRepository } from '../domain/repositories/ITransactionsRepository';
import { PDFProvider } from '../providers/PdfProvider/implementations/PdfProvider';

export class TransactionsReportUseCase {
  constructor(
    private transactionsRepository: ITransactionsRepository,
    private pdfProvider: PDFProvider
  ) {}

  public async execute({
    userId,
    initialPeriod,
    finalPeriod
  }: ITransactionReportRequest): Promise<Buffer | undefined> {
    const transactions = await this.transactionsRepository.getReport({
      userId,
      initialPeriod,
      finalPeriod
    });

    const pdfBuffer = await this.pdfProvider.generatePDF({
      ...transactions,
      totalRevenue: formatCurrency(transactions?.totalRevenue || 0),
      totalExpenses: formatCurrency(transactions?.totalExpenses || 0),
      finalBalance: formatCurrency(transactions?.finalBalance || 0),
      totalTaxes: formatCurrency(transactions?.totalTaxes || 0),
    });

    return pdfBuffer;
  }
}
