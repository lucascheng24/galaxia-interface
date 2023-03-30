export interface user {
    uid?: string,
    username?: string,
    password?: string,
    role?: Role,
    email?: string,
    createdAt?: Date,
    updatedAt?: Date,
    locked?: boolean,
    enabled?: boolean




}


export enum Role {
    USER = 'User',
    ADMIN = 'Admin'
}
