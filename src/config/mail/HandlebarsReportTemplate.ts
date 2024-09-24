import handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseReportTemplate {
  file: string;
  variables: ITemplateVariable;
}

class HandlebarsReportTemplate {
  public async parse({ file, variables }: IParseReportTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(file);

    return parseTemplate(variables);
  }
}

export default HandlebarsReportTemplate;
