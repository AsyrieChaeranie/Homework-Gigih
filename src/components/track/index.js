import { useState, useEffect } from 'react';

function Track(props) {
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        // console.log('ini uri', props.uri)
        // console.log('ini isi state uri', isIdExist)
        const checkedUri = props.isUriExist.find(uri => uri === props.uri)
        if (checkedUri) {
            setIsSelected(true)
        }
        else {
            setIsSelected(false)
        }
    }, [props.uri]);

    const handleSelectedButton = (uri) => {
        // if (status === false || status === undefined) {
        //     setIsSelected(false)
        // }
        // else {
        //     setIsSelected(false)
        // }
        // console.log(e)
        // setIsSelected(!isSelected)
        // props.getUri(uri)
        if (isSelected) {
            setIsSelected(false)
            props.savetUri(uri, false)
        }
        else {
            setIsSelected(true)
            props.savetUri(uri, true)
        }
        // console.log('ini uri sebelum masuk state', uri)
        // console.log('ini isi state uri', isIdExist)
        // props.getUri(uri, isSelected)
    }

    return (
        <div className="track-item">
            <img src={props.image} alt="" />
            <p className="title">{props.title}</p>
            <p className="artist">{props.artist}</p>
            <button onClick={() => handleSelectedButton(props.uri)}>
                {isSelected ? 'Deselect' : 'Select'}
            </button>

        </div >
    );
}

export default Track;