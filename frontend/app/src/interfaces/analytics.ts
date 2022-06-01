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
export interface ctezMainHeader {
    total_ovens: number;
    TVL: number;
}
export interface ctezOven {
    total_ovens: number;
    created_ovens: number;
    liquidated_ovens: number;
    TVL: number;
    total_supply: number;
    collateral_supply: number;
}
export interface ctezGraphctez {
    id: number;
    current_price: number;
    current_target: number;
    premium: number;
    timestamp: Date;
}
export interface ctezGraphctezDateRange {
    id: number;
    current_price: number;
    current_target: number;
    premium: number;
    timestamp_from: Date;
    timestamp_to: Date;
}

export interface TvlData {
    timestamp: Date;
    tvl: number;
    id: number;
}

export interface ctezGraphTVL {
    tvlData: TvlData[];
}

export interface Ovendata {
    ctezStanding: number;
    id: number;
    ovenAddress: string;
    tezStanding: number;
    timestamp: Date;
}
export interface TwoLineGraph {
    data1:number | string;
    data2:number | string;
    value:number | string;
    time:number | string | Date;
}

export interface ctezGraphOvendata {
    ovendata: Ovendata[];
}

export interface MintBurnData {
    id: number;
    address: string;
    ovenAddress: string;
    target: number;
    timestamp: Date;
    burnAmount: number;
}

export interface ctezOvenTransaction {
    mintBurnData: MintBurnData[];
}
export interface Volumestat {
    sellVolume: number;
    buyVolume: number;
    timestamp: Date;
    volume24hours: number;
}

export interface ctezGraphVolumestat {
    volumestats: Volumestat[];
}