export interface priceSats {
    ctez_price: number;
    tez_price: string;
    timestamp: Date;
}
export interface driftGraphInterface {
    id: number;
    drift: number;
    timestamp: Date;
    epoch_timestamp: number;
}
export interface driftGraphInterfaceAll {
    id: number;
    drift: number;
    timestamp_from: Date;
    timestamp_to: Date;
    epoch_timestamp_from: number;
    epoch_timestamp_to: number;
}
export interface ctezMainHeader {
    Total_Ovens: number;
    Amm_TVL: number;
    Oven_TVL: number;
    Total_TVL: number;
    collateral_locked: number;
    total_debt: number;
    Total_AMM: number;
}
export interface ctezOven {
    total_ovens: number;
    created_ovens: number;
    liquidated_ovens: number;
    collateral_locked: number;
    total_debt: number;
    collateral_ratio: string;
}
export interface ctezGraphctez {
    id: number;
    current_price: number;
    current_target: number;
    premium: number;
    timestamp: Date;
    epoch_timestamp:number;
}
export interface ctezGraphctezDateRange {
    id: number;
    current_price: number;
    current_target: number;
    premium: string;
    timestamp_from: Date;
    timestamp_to: Date;
    epoch_timestamp_from: number;
    epoch_timestamp_to: number;
}

export interface TvlData {
    ovenTvl: number;
    epochTimestamp: number;
    timestamp: Date;
    ammTvl: number;
    id: number;
}

export interface TvlDataALL {
    ammTvl: number;
    epochTimestampFrom: any;
    epochTimestampTo: any;
    id: number;
    timestampFrom: Date;
    timestampTo: Date;
    ovenTvl: number;
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
    premium?:number | string,
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
    id:number;
    value:number | string;
    address:number |string;
    time:number | string | Date;
    ctez_standing: any;
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
    burnAmount: number;
    epochTimestamp: any;
    id: number;
    operationHash: string;
    ovenAddress: string;
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
export interface AMMTransactionLiquidity {
    id: number;
    quantityBurn: number;
    quantityMint: number;
    quantityPool1: number;
    quantityPool2: number;
    quantityTk1: number;
    quantityTk2: number;
    timestamp: Date;
    trader: string;
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
    address: string;
    epochTimestamp: any;
    id: number;
    mintAmount: number;
    operationHash: string;
    ovenAddress: string;
    target: number;
    timestamp: Date;
}