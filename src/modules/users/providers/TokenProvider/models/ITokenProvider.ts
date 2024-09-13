interface ITokenProviderPayload {
  userId: string;
}

export interface ITokenProvider {
  generateToken(payload: ITokenProviderPayload): Promise<string>;
}
