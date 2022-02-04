import Board from "../components/Game/board";
import {Attempts, GameConfig, LETTER_MATCH_STATUS} from "../declarations/game.declarations";
import {GameDefaultConfig} from "../declarations/game.values";
import {Header} from "../components/Layout/Header";
import {useEffect, useState} from "react";
import {KeyboardBackspacePressed, KeyboardEnterPressed, KeyboardLetterPressed} from "../helpers/keyboard.helpers";
import {ActionFunction, useActionData, useSubmit} from "remix";
import {CreateDictionaryFromWord} from "../helpers/wordle.helpers";
import {currentAttemptIsCompleted, getCurrentStateClone} from "./game.helpers";
import useWindowEventListener from "../hooks/windowEventListener.hook";

export const action: ActionFunction = async ({request}) => {
    const attempts: Attempts = await request.formData().then(fd => JSON.parse(fd.get('attempts') as any) as Attempts);
    const MAGIC_WORD = 'AHORA' // THIS SHOULD COME FROM EXTERNAL SERVER
    const WordDictionary = CreateDictionaryFromWord(MAGIC_WORD)
    let lastAttempt = attempts.pop()

    if (!lastAttempt) return null;

    lastAttempt = lastAttempt.map((letter, position) => {
        let status = LETTER_MATCH_STATUS.MISSED

        if (WordDictionary.isInDictionary(letter.value)) status = LETTER_MATCH_STATUS.MATCH;

        if (WordDictionary.isMatch(letter.value, position)) status = LETTER_MATCH_STATUS.HIT;

        return {
            ...letter,
            status
        }
    })

    attempts.push(lastAttempt)

    attempts.push([])

    return {attempts}
}

export default function Game() {

    const ActionData = useActionData<{ attempts: Attempts }>()

    const submit = useSubmit();
    const gameConfig: GameConfig = GameDefaultConfig
    const [currentAttemptPosition, setCurrentAttemptPosition] = useState<number>(0);
    const [attempts, setAttempts] = useState<Attempts>([[]]);

    const addNewLetterToCurrentAttempt: (letter: string) => void = (letter) => {
        const [_currentAttempt, _attempts] = getCurrentStateClone(attempts, currentAttemptPosition)
        const newPosition = Math.max(0, Math.min(gameConfig.wordLength - 1, _currentAttempt.length))
        _currentAttempt[newPosition] = {value: letter, status: LETTER_MATCH_STATUS.NONE}
        _attempts[currentAttemptPosition] = _currentAttempt
        setAttempts(_attempts)
    }

    const removeLastLetter: () => void = () => {
        const [_currentAttempt, _attempts] = getCurrentStateClone(attempts, currentAttemptPosition)
        _currentAttempt.pop()
        _attempts[currentAttemptPosition] = _currentAttempt
        setAttempts(_attempts)
    };

    const submitAttempt: () => void = () => {
        if (!currentAttemptIsCompleted(attempts, currentAttemptPosition, gameConfig)) {
            return alert('Not Completed')
        }
        if (confirm('Sure wanna submit?')) {
            submit({attempts: JSON.stringify(attempts)}, {method: "post", action: '/game'})
        }
    };

    useWindowEventListener('keyup', KeyboardLetterPressed((char) => addNewLetterToCurrentAttempt(char)))
    useWindowEventListener('keyup', KeyboardBackspacePressed(() => removeLastLetter()))
    useWindowEventListener('keyup', KeyboardEnterPressed(() => submitAttempt()))

    useEffect(() => {
        if (ActionData?.attempts) {
            setAttempts(ActionData.attempts)
            setCurrentAttemptPosition(ActionData.attempts.length - 1)
        }
    }, [ActionData])

    return (
        <>
            <Header/>
            <Board config={gameConfig} attempts={attempts}/>
        </>
    )
}