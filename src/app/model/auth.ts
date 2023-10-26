export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    uniqueIdString: string;
    createdAt: string;
}

export interface LoginData {
    email: string;
    password: string;
}