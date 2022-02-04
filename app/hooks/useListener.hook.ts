import {useLatestRef} from "./useLatestRef.hook";
import {useEffect} from "react";

type eventListener = <Handler>(eventName: string, handler: Handler) => void
type listenable = { addEventListener: eventListener, removeEventListener: eventListener }
type useEventListenerType = <Handler extends CallableFunction = CallableFunction>(node: listenable, eventName: string, handler: Handler) => void

export const useEventListener: useEventListenerType = (node, eventName, handler) => {
    const handlerRef = useLatestRef<CallableFunction>(handler)
    useEffect(() => {
        const currentHandlerRefCallback = () => handlerRef.current()
        node.addEventListener(eventName, currentHandlerRefCallback())
        return () => {
            node.removeEventListener(eventName, currentHandlerRefCallback())
        }
    }, [eventName, handlerRef])
}

export default useEventListener;