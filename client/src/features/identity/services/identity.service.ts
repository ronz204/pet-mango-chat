import { httpClient } from '@helpers/httpClient';
import type {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from './identity.types';

class IdentityService {
  async signIn(data: SignInRequest): Promise<SignInResponse> {
    return httpClient.post<SignInResponse>('/auth/signin', data);
  }

  async signUp(data: SignUpRequest): Promise<SignUpResponse> {
    return httpClient.post<SignUpResponse>('/auth/signup', data);
  }
}

export const identityService = new IdentityService();
