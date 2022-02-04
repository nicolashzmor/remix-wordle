export const CreateDictionaryFromWord = (word: string) => {
    return Dictionary(word)
}

export const MatchDictionaryWithWord = () => {}

export function Dictionary(word: string) {
    const dictionary = word.split('').reduce((dictionary: Record<string, number[]>, letter, index) => {
        return {...dictionary, [letter.toLowerCase()]: [...(dictionary[letter] || []), index]}
    }, {})

    const letters = Object.keys(dictionary)

    const isInDictionary = (letter: string) => {
        return letters.includes(letter.toLowerCase())
    }
    const isMatch = (letter: string, position: number) => {
        return (dictionary[letter.toLowerCase()] || []).includes(position)
    }
    return {
        isInDictionary,
        isMatch
    }
}

export function Matcher(){}