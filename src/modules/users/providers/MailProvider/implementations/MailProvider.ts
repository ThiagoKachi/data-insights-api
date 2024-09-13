
import { env } from '@config/env';
import HandlebarsMailTemplate from '@config/mail/HandlebarsMailTemplate';
import { AppError } from '@shared/errors/AppError';
import path from 'node:path';
import { Resend } from 'resend';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  variables: ITemplateVariable;
}

export interface ISendMail {
  to: string;
  from?: string;
  subject: string;
  templateData: IParseMailTemplate;
}

const resend = new Resend(env.RESEND_API_KEY);

export class ResendMail {
  public async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();

    const forgotPasswordTemplate = path
      .resolve(__dirname, '..', '..', '..', 'views', 'forgot_password.hbs');

    const { error } = await resend.emails.send({
      from: from || 'Equipe Data Insights TJK <thiago@thikachi.dev.br>',
      to,
      subject,
      html: await mailTemplate.parse({
        file: forgotPasswordTemplate,
        variables: templateData.variables
      }),
    });

    if (error) {
      throw new AppError(error.message);
    }
  }
}
