import { IReportTemplateVariable } from './ITemplateVariable';

export interface IPdfProvider {
  generatePDF(variables: IReportTemplateVariable): Promise<Buffer>
}
