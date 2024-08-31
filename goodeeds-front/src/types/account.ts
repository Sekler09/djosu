export interface AccountDto {
  password: string;
  username: string;
}

export type UpdateAccountDto = Partial<AccountDto>
