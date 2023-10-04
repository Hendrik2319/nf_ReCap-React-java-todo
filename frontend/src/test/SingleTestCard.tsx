import {useNavigate, useParams} from "react-router-dom";
import TestCard from "./TestCard.tsx";
import {useState} from "react";

export default function SingleTestCard() {
    const urlParams = useParams()
    const index = urlParams.index
    const navigate = useNavigate();
    const [counter, setCounter] = useState<number>(0)
    console.debug(`Rendering SingleTestCard { index:${index}, counter:${counter} }`)

    function generateCallID(): number {
        return Math.floor(10000+Math.random()*90000)
    }

    return (
        <>
            <div>Counter: {counter}</div>
            <div>
                <button onClick={() => setCounter(counter-1)}>-</button>
                <button onClick={() => setCounter(counter+1)}>+</button>
            </div>
            <TestCard index={index ? index : "???"} callID={generateCallID()} showRenderingMessage={true}/>
            <button onClick={() => navigate("/test")}>Back</button>
        </>
    )
}
