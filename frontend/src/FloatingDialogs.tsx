import './FloatingDialogs.css'
import React, {ReactNode} from "react";

export type DialogControl<DialogOptions> = {
    closeDialog: ()=>void
    setInitFuntion: ( initFunction: (options:DialogOptions)=> void ) => void
}

export function createDialog<DialogOptions>( id:string, writeContent: ( dialogControl: DialogControl<DialogOptions> ) => ReactNode ) {

    let initFunction: undefined | ((options:DialogOptions)=> void) = undefined

    function showDialog( visible:boolean, options?:DialogOptions ) {
        const dialog = document.querySelector('#'+id)
        if (dialog) {
            if (visible) {
                dialog.classList.add('visible')
                if (initFunction && options)
                    initFunction( options )
            }
            else
                dialog.classList.remove('visible')
        }
    }

    function closeDialog() {
        showDialog(false)
    }

    function setInitFuntion( initFunction_: (options:DialogOptions)=> void ) {
        initFunction = initFunction_;
    }

    return {
        showDialog : (options?:DialogOptions) => showDialog(true, options),
        closeDialog,
        writeHTML  : () => (
            <div id={id} className="DialogBackground">
                <div className="Dialog">
                    {writeContent({ closeDialog, setInitFuntion })}
                </div>
            </div>
        )
    }
}
