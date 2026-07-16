import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "./Button";
import Editor from "./Editor";
import Header from "./Header";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";

const Edit = () => {
    const {onUpdate, onDelete} = useContext(DiaryDispatchContext);
    const { id } = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const goBack = () => {navigate(-1);}

    const onSubmit = (data) => {

        if(window.confirm("일기를 수정하시겠습니까?")) {
            const {id,date, content, emotionId} = data;
            onUpdate(Number(id),date, content, emotionId);
            navigate("/", {replace:true});
        }
    };
    const onClickDelete = () =>{
        if(window.confirm("정말 일기를 삭제할까요? 삭제시 복구가 불가능합니다!!")) {
            onDelete(Number(id));
            navigate("/",{replace:true});
        }
    };

    if (!data) return <div>일기를 불러오는중...!</div>
    else {
        return (
            <div>
                <Header 
                    title={"일기 수정하기"}
                    leftchild={<Button text={'<뒤로가기'} onClick={goBack}/>}
                    rightchild={<Button text={'삭제하기'} type={'negative'} onClick={onClickDelete}/>}
                />
                <Editor initData={data} onSubmit={onSubmit}></Editor>
            </div>
        );
    }
}

export default Edit;