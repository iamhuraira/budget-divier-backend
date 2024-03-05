export declare class TokenDto {
    userId: string;
    accessToken: string;
    refreshToken: string;
}
export type TokenDTOWithoutID = Omit<TokenDto, 'userId'>;
