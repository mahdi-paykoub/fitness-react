import { React } from 'react'
import './style.css'

export default function BtnSpiner({ wid = '45px', he = '45px' }) {


    return (
        <>
            <span className="loader-2" style={{ 'width': wid, 'height': he }}></span>
        </>
    )
}
