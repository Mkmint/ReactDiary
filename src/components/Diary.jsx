import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import { getFormattedDate } from "./util";
import Viewer from "./Viewer";
import Header from "./Header";
import Button from "./Button";


const Diary = () => {
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate()
    const goBack = () =>{navigate(-1)};
    const goEdit = () =>{navigate(`/edit/${id}`)};
    
    if (!data) return <div>일기 불러오기...!</div>
    else {
        const {id,date,content,emotionId}=data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`;

        return (
            <div>
                <Header 
                    title = {title}
                    leftchild = {<Button text={'>뒤로가기'} onClick={goBack}/>}
                    rightchild = {<Button text={'수정하기'} onClick={goEdit}/>}
                />
                <Viewer emotionId={emotionId} content={content}/>
            </div>
        );
    }      
}

export default Diary;