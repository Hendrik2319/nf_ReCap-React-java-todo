import {useState} from "react";
import TestCard from "./TestCard.tsx";

export default function TestList() {
    const [counter, setCounter] = useState<number>(0)
    const arr = Array(5+Math.max(counter,0)).fill(0).map((n,index) => index)
    console.debug(`Rendering TestList { counter:${counter} }`)

    function generateCallID(): number {
        return Math.floor(100000+Math.random()*900000)
    }

    return (
        <>
            <div>Counter: {counter}</div>
            <div>
                <button onClick={() => setCounter(counter-1)}>-</button>
                <button onClick={() => setCounter(counter+1)}>+</button>
            </div>
            <div className="TestList">
                {arr.map( n => <TestCard key={n} index={"["+n+"]"} callID={generateCallID()} showRenderingMessage={arr.length<=7}/>)}
            </div>
        </>
    )
}
