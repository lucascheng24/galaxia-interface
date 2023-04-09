
export enum common_request {
    serverBaseUrl = 'http://localhost:8080/api'
}


export interface JwtPayload {
    exp?: number;
    iat?: number;
    iss?: string;
    jti?: string;
    rol?: string;
    sub?: string;
}


