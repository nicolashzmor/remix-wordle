import {useLatestRef} from "./useLatestRef.hook";
import {useEffect} from "react";

type useWindowEventListenerType = <Handler extends CallableFunction = CallableFunction>(eventName: string, handler: Handler) => void

export const useWindowEventListener: useWindowEventListenerType = (eventName, handler) => {
    const handlerRef = useLatestRef<CallableFunction>(handler)
    useEffect(() => {
        const currentHandlerRefCallback = (event: Event) => handlerRef.current(event)
        window.addEventListener(eventName, currentHandlerRefCallback)
        return () => {
            window.removeEventListener(eventName, currentHandlerRefCallback)
        }
    }, [eventName, handlerRef])
}

export default useWindowEventListener;