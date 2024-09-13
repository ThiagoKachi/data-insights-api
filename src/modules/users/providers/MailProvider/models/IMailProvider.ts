import { ISendMail } from '../implementations/MailProvider';

export interface IMailProvider {
  sendMail(payload: ISendMail): Promise<void>;
}
