import React, {MutableRefObject} from "react";

type useLatestRefType = <T>(value: T) => MutableRefObject<T>
export const useLatestRef: useLatestRefType = (value) => {
    const ref = React.useRef(value)
    React.useEffect(() => {
        return () => {
            ref.current = value
        };
    }, [value]);
    return ref
}

export default useLatestRef