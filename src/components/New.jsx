import { useContext } from "react";
import Button from "./Button";
import Editor from "./Editor";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";

const New = () => {

    const { onCreate } = useContext(DiaryDispatchContext);
    const navigate = useNavigate();
    const goBack = () =>{navigate(-1)};
    const onSubmit = (data) => {
        const {date, content, emotionId} = data;
        onCreate(date,content,emotionId);
        navigate("/", {replace:true});
    };

    return (
        <div>
            <Header
                title={"새 일기를 쓰기!"}
                leftchild={<Button text={'<뒤로가기'} onClick={goBack}/>}/>
            <Editor onSubmit={onSubmit}></Editor>
        </div>
    );
}

export default New;