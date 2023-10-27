
const fs = require('fs');
import * as crypto from 'crypto';


//const FILE_PATH = './users.json';
const FILE_PATH = './signup.json';
export const DATE_FORMAT: string = 'yyyy/MM/dd HH:mm:ss z';

export interface UserFile {
    users: User[];
};
export interface RegisterFile {
    signup: RegisterData[];
}
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
export interface RegisterData{
    id: number;
    fname:any;
    lname:any;
    email:any;
    password:any;
    mobile:any;
    uniqueIdString: string;
    createdAt: string;
}
interface AuthService { 
    register(user: RegisterData): void;
    login(email: string, password: string): RegisterData | undefined;
    getUserByUniqueId(id: string): User | undefined;
}

export const authService: AuthService = {
    register,
    login,
    getUserByUniqueId
};

function createUserFile(): void {
    const userFile: UserFile = {
        users: []
    };
    const data = JSON.stringify(userFile);
    fs.writeFileSync(FILE_PATH, data);
};

function createSignupFile(): void {
    const userFile: RegisterFile = {
        signup: []
    };
    const data = JSON.stringify(userFile);
    fs.writeFileSync(FILE_PATH, data);
};

function readUsers(): UserFile | undefined {
    if (!fs.existsSync(FILE_PATH)) {
        createUserFile();
    }
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    const users = JSON.parse(data);
    return users;
};

function readSignup(): RegisterFile | undefined {
    if (!fs.existsSync(FILE_PATH)) {
        createSignupFile();
    }
    const data = fs.readFileSync(FILE_PATH, 'utf8');
    const users = JSON.parse(data);
    return users;
};

function register(user: RegisterData): RegisterData | undefined {
    const userFile = readSignup();
    console.log("userfile",userFile);
    if (!userFile) {
        return undefined;
    }
    const users = userFile.signup;
    
    const index = users.findIndex((u: RegisterData) => { return u.email === user.email; });
    if(index !== -1) {
        return undefined;
    }
    user.createdAt = new Date().toISOString();
    let uniqueId = crypto.randomBytes(16).toString('hex');
    while(users.findIndex((u: RegisterData) => { return u.uniqueIdString === uniqueId; }) >= 0){
        uniqueId = crypto.randomBytes(16).toString('hex');
    } 
    
    user.uniqueIdString = uniqueId;
    user.id = users.length + 1; 

    users.push(user);
    const data = JSON.stringify(userFile);
    fs.writeFileSync(FILE_PATH, data);
   
    return user;
    
   // return undefined;
};

function login(email: string, password: string): RegisterData | undefined {
   // const userFile = readUsers();
   const userFile = readSignup();
    if (!userFile) {
        return undefined;
    }
   // const users = userFile.users;
   const users = userFile.signup;
    
    return users.find((user: RegisterData) => {
        return user.email === email && user.password === password;
    });
};

function getUserByUniqueId(id: string): User | undefined {
    const userFile = readUsers();
    if (!userFile) {
        return undefined;
    }
    const users = userFile.users;
    return users.find((user: User) => {
        return user.uniqueIdString === id;
    });
};