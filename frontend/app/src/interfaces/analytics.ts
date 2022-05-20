export interface priceSats {
    ctez_price: number;
    tez_price: string;
    timestamp: Date;
}
export interface driftGraphInterface {
    id: number;
    currentAnnualDrift: number;
    timestamp: Date;
}