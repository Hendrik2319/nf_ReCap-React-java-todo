import {useState} from "react";
import './Test.css'
import {useNavigate} from "react-router-dom";

type Props = {
    index: string
    callID: number
    showRenderingMessage: boolean
}

export default function TestCard( props:Props ) {
    const [counter, setCounter] = useState<number>(0)
    const navigate = useNavigate();
    if (props.showRenderingMessage) console.debug(`Rendering TestCard { index:${props.index}, callID:${props.callID}, counter:${counter} }`)

    return (
        <div className="TestCard">
            <div>CallID: {props.callID}</div>
            <div>Counter: {counter}</div>
            <div>
                <button onClick={() => setCounter(counter-1)}>-</button>
                <button onClick={() => setCounter(counter+1)}>+</button>
                <button onClick={() => navigate("/test/"+props.index)}>##</button>
            </div>
        </div>
    )
}
