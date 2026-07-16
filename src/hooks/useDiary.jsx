import { useContext, useEffect, useState } from "react";
import {DiaryStateContext} from '../App';
import { useNavigate } from "react-router-dom";


//커스텀 훅
const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [diary, setDiary] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        const matchDiary = data.find((it)=>String(it.id)===String(id));
        if(matchDiary) setDiary(matchDiary);
        else {
            alert("해당 일기가 존재하지 않습니다!");
            navigate("/",{replace: true}); //일기 없으면 홈페이지로
        }
    },[id]);

    return diary;

}


export default useDiary;