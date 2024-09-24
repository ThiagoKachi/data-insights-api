import HandlebarsReportTemplate from '@config/mail/HandlebarsReportTemplate';
import { PDFProvider } from '../providers/PdfProvider/implementations/PDFProvider';

export function makeReportTemplateUseCase() {
  const reportTemplate = new HandlebarsReportTemplate();

  return new PDFProvider(
    reportTemplate
  );
}
