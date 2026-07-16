import './DiaryList.css'
import Button from './Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';


const DiaryList = ({data}) =>{
    const sortOptionList = [
        {value:"latest", name:"최신순!"},
        {value:"oldest", name:"오래된 순!"}
    ];

    const [sortType, setSortType] = useState("latest");
    const [sortedData, setSortedData] = useState([]);

    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }
    

    const navigate = useNavigate();
    const onClickNew = () => {
        navigate("/new");
    }
    const goGraph = () => {
        navigate("/graph");
    }
    useEffect(()=>{
        const compare = (a,b) => {
            if(sortType==="latest") return Number(b.date)-Number(a.date);
            else if(sortType=="oldest") return Number(a.date)-Number(b.date);
        }

        const copyList = JSON.parse(JSON.stringify(data));
        copyList.sort(compare);
        setSortedData(copyList);
    },[data,sortType]);

    return (
        <>
            <div className='DiaryList'>
                <div className="menu_wrapper">
                    <div className="left_col">
                        <select value={sortType} onChange={onChangeSortType}>
                            {sortOptionList.map((it,idx) => (
                                <option key={idx} value={it.value}>
                                    {it.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="right_col">
                        <Button type={'positive'} text = {"새 일기 쓰기!"} onClick={onClickNew}/>
                        <Button type={'negative'} text = {"감정 그래프 자세하게..."} onClick={goGraph}/>
                    </div>
                </div>
                <div className='list_wrapper'>
                    {sortedData.map((it)=><DiaryItem key={it.id}{...it}/>)}
                </div>
            </div>
        </>
    );
}

export default DiaryList;