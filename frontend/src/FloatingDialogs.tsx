import './FloatingDialogs.css'
import React, {ReactNode} from "react";

export default function createDialog( id:string, writeContent: ( closeDialog: ()=>void ) => ReactNode ) {

    function showDialog( visible:boolean ) {
        const dialog = document.querySelector('#'+id)
        if (dialog) {
            if (visible)
                dialog.classList.add('visible')
            else
                dialog.classList.remove('visible')
        }
    }

    function closeDialog() {
        showDialog(false)
    }

    return {
        showDialog : () => showDialog(true),
        closeDialog,
        writeHTML  : () => (
            <div id={id} className="DialogBackground">
                <div className="Dialog">
                    {writeContent(closeDialog)}
                </div>
            </div>
        )
    }
}
