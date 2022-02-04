import {Attempt, Attempts, GameConfig} from "../declarations/game.declarations";

export const getCurrentStateClone: (attempts: Attempts, currentAttemptPosition: number) => [Attempt, Attempts] = (attempts, currentAttemptPosition) => {
    const _attempts = [...attempts]
    return [_attempts[currentAttemptPosition], _attempts]
}

export const currentAttemptIsCompleted: (attempts: Attempts, currentAttemptPosition: number, gameConfig: GameConfig) => boolean =
    (attempts, currentAttemptPosition, gameConfig) => {
        const [current] = getCurrentStateClone(attempts, currentAttemptPosition)
        return current.length === gameConfig.wordLength
    }