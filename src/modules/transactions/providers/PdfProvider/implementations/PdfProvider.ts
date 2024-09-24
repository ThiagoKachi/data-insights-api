import HandlebarsReportTemplate from '@config/mail/HandlebarsReportTemplate';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { IPdfProvider } from '../models/IPdfProvider';
import { IReportTemplateVariable } from '../models/ITemplateVariable';

export class PDFProvider implements IPdfProvider {
  constructor(private reportTemplate: HandlebarsReportTemplate) {}

  public async generatePDF(
    variables: IReportTemplateVariable | undefined
  ): Promise<Buffer> {
    const htmlTemplatePath = path.resolve(__dirname, '..', '..', '..', 'views', 'template.hbs');

    const htmlTemplate = fs.readFileSync(htmlTemplatePath, 'utf8');

    const html = await this.reportTemplate.parse({
      file: htmlTemplate,
      variables: variables || {}
    });

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html);

    const pdfBuffer = Buffer.from(await page.pdf({ format: 'a4' }));

    await browser.close();

    return pdfBuffer;
  }
}
