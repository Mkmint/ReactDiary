import './Editor.css';
import { useState, useEffect } from 'react';
import { emotioinList, getFormattedDate } from './util';
import Button from './Button';
import { data, useNavigate } from 'react-router-dom';
import EmotionItem from './EmotionItem';

const Editor = ({onSubmit, initData}) => {

    const navigate = useNavigate();

    const [state, setState] = useState(
        {
            date : getFormattedDate(new Date()),
            emotionId : 2,
            content : ""
        }
    );

    useEffect(()=>{
        if(initData) {
            setState({...initData,
                date : getFormattedDate(new Date(parseInt(initData.date)))
            })
        }
    },[])

    const handleChangeDate = (e) => {
        setState({...state, date : e.target.value});
    }

    const handleChangeContent = (e) => {
        setState({...state, content : e.target.value});
    }

    const handleSubmit = () => {
        onSubmit(state);
    }

    const handleGoBack = () => {
        navigate(-1);
    }

    const handleChangeEmotion = (emotionId) => {
        setState({...state, emotionId});
    }
    return(
        <>
            <div className='Editor'>
                <div className='editor_section'>
                    <h4>오늘의 날짜!</h4>
                    <div className='input_wrapper'>
                        <input type='date' value={state.date} onChange={handleChangeDate}/>
                    </div>
                </div>
                <div className='editor_section'>
                    <h4>오늘의 감정!</h4>
                    <div className='input_wrapper emotion_list_wrapper'>
                        {emotioinList.map((it)=>
                            <EmotionItem key ={it.id}{...it}
                            onClick={handleChangeEmotion}
                            isSelected={state.emotionId===it.id}
                            />
                        )}
                    </div>
                </div>
                <div className='editor_section'>
                    <h4>오늘의 일기!</h4>
                    <div className='input_wrapper'>
                        <textarea placeholder = "오늘 어땟어요?" value={state.content} onChange={handleChangeContent}/>
                    </div>
                </div>
                <div className='editor_section'>
                    <h4>오늘의 작성완료 / 취소!</h4>
                    <div className='editor_section bottom_section'>
                        <Button text = {'취소하기!'} onClick={handleGoBack}/>
                        <Button text = {'작성완료!'} type="positive" onClick={handleSubmit}/>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Editor;