export interface User{
    id: string;
    email: string;
    password: string;
    username: string;
    role: 'admin' | 'clerk';
    mobile: string;
}