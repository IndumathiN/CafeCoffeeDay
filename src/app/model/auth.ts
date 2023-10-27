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
    fname:any;
    lname:any;
    email:any;
    password:any;
    mobile:any;
}
export interface MenuItem{
    
    name: string;
    calories: string;
    category: string;
    dairy: boolean;
    description: string;
    flavor: boolean;
    image: string;
    sweetner: boolean;
    pricelist:{
        large:number;
        medium:number;
        small:number
    };
}