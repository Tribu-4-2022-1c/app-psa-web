import React from 'react'
import { Audio } from 'react-loader-spinner'

export const LoadComponent = (props: any) => {

    const { winHeight, soporteCSS, load } = props;

    return (
        <div>
            {load && <div style={{ height: winHeight }} className={`${soporteCSS.contentAudio}`}>
                <Audio
                    height="50"
                    width="50"
                    color='#003066'
                    ariaLabel='loading'
                />
            </div>}
        </div>
    )
}
