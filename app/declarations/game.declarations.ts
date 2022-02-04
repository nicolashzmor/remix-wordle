export type Attempt = Letter[]
export type Attempts = Attempt[]

export enum LETTER_MATCH_STATUS {
    NONE,
    MISSED,
    MATCH,
    HIT
}

export interface Letter {
    value: string
    status: LETTER_MATCH_STATUS
}

export interface GameConfig {
    wordLength: number
    attemptsAllowed: number
}



