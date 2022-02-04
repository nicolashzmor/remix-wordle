type Callback = (...args: any[]) => void
type VoidCallback = () => void
type InputLetterCallback = (char: string) => void

type DataExtractor = (event: KeyboardEvent) => string

const RegexTest: (extractor: DataExtractor) => (regex: RegExp) => (event: KeyboardEvent) => boolean =
    (extractor) =>
        (regex) =>
            (event) => {
                return regex.test(extractor(event))
            }

const ExecWhenMatch: (event: KeyboardEvent) => (callback: Callback) => (extractor: DataExtractor) => (regex: RegExp) => void =
    (event) =>
        (callback) =>
            (extractor) =>
                (regex) => {
                    if (RegexTest(extractor)(regex)(event)) callback(extractor(event), event)
                }

const ExtractEventKey: DataExtractor = (event: KeyboardEvent) => event.key

const InputLettersFilter: (callback: InputLetterCallback) => (event: KeyboardEvent) => void =
    (callback) =>
        (event) => {
            ExecWhenMatch(event)(callback)(ExtractEventKey)(/^[a-zA-Z]$/)
        }

const BackSpaceFilter: (callback: VoidCallback) => (event: KeyboardEvent) => void =
    (callback) =>
        (event) =>
            ExecWhenMatch(event)(callback)(ExtractEventKey)(/^(Backspace)$/)

const EnterFilter: (callback: VoidCallback) => (event: KeyboardEvent) => void =
    (callback) =>
        (event) =>
            ExecWhenMatch(event)(callback)(ExtractEventKey)(/^(Enter)$/)

export const KeyboardBackspacePressed = (callback: VoidCallback) => BackSpaceFilter(callback)
export const KeyboardLetterPressed = (callback: InputLetterCallback) => InputLettersFilter(callback)
export const KeyboardEnterPressed = (callback: VoidCallback) => EnterFilter(callback)

