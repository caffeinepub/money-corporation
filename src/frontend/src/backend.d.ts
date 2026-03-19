import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Application {
    id: bigint;
    status: ApplicationStatus;
    applicant: Principal;
    productCategory: ProductCategory;
    name: string;
    productName: string;
    email: string;
    requestedAmount?: number;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface Product {
    maxAmount: number;
    features: Array<string>;
    minAmount: number;
    name: string;
    interestRate: number;
    category: ProductCategory;
}
export enum ApplicationStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum ProductCategory {
    loan = "loan",
    account = "account"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    editProduct(product: Product): Promise<void>;
    getApplication(id: bigint): Promise<Application>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProduct(name: string): Promise<Product | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listAllApplications(): Promise<Array<Application>>;
    listMyApplications(): Promise<Array<Application>>;
    listProducts(): Promise<Array<Product>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitApplication(name: string, email: string, phone: string, productName: string, requestedAmount: number | null): Promise<bigint>;
    updateApplicationStatus(id: bigint, newStatus: ApplicationStatus): Promise<void>;
}
