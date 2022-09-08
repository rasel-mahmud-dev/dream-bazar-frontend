

export interface IndexType{
    [key: string]: {
        unique?: boolean,
        sparse?: boolean,
        name?: string, // The name of the index
        expireAfterSeconds?: Number
    }
}