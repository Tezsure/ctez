export interface priceSats {
    ctez_price: number;
    tez_price: string;
    timestamp: Date;
}
export interface driftGraphInterface {
    id: number;
    drift: number;
    timestamp: Date;
}
export interface driftGraphInterfaceAll {
    id: number;
    drift: number;
    timestamp_from: Date;
    timestamp_to: Date;
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

export interface TvlDataALL {
    id: number;
    timestampFrom: Date;
    timestampTo: Date;
    tvl: number;
}

export interface TvlAMMData {
    ctez_price: number;
    tez_price: string;
    timestamp: Date;
    tvl: number;
}
export interface TvlAMMDataAll {
    ctez_price: number;
    tez_price: string;
    timestamp_from: Date;
    timestamp_to: Date;
    tvl: number;
}
export interface VolumeAMMData {
    sellVolume: number;
    buyVolume: number;
    timestamp: Date;
    volume24hours: number;
}
export interface VolumeAMMDataAll {
    id: number;
    timestampFrom: Date;
    timestampTo: Date;
    tokenSymbol: string;
    volume: number;
}
export interface ctezGraphTVL {
    tvlData: TvlData[];
}

export interface Ovendata {
    ctez_standing: any;
    oven_address: string;
    percentage: string;
}
export interface TwoLineGraph {
    data1:number | string;
    data2:number | string;
    value:number | string;
    time:number | string | Date;
}
export interface TwoLineGraphWithoutValue {
    data1:number | string;
    data2:number | string;
    value:number | string;
    time:number | string | Date;
}
export interface OneLineGraph {
    value:number | string;
    time:number | string | Date;
}
export interface PiGraphOven {
    id:number,
    value:number | string;
    time:number | string | Date;
}
export interface PiGraph {
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
export interface DepositTransactionTable {
    address: string;
    amount: number;
    id: number;
    ovenAddress: string;
    sideOven: number;
    target: number;
    timestamp: Date;
}
export interface SwapTransaction {
    id: number;
    price: number;
    tezQty: number;
    timestamp: Date;
    tokenQty: number;
    trader: string;
    sideTrade: number;
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

export interface OvenTransactionTable {
    id: number;
    mintAmount: number;
    address: string;
    ovenAddress: string;
    target: number;
    timestamp: Date;
}