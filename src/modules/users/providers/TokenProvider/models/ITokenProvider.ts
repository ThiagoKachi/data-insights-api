export interface ITokenProvider {
  generateToken(payload: string): Promise<string>;
}
