import { useSearchParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import Button from "./Button";
import Header from "./Header";
import Editor from "./Editor";
import { getMonthRangeByDate } from "./util";
import DiaryList from "./DiaryList";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams);
    console.log(searchParams.get("sort"));

    const data = useContext(DiaryStateContext);

    const [filteredData, setFilteredData] = useState([]);

    const [pivotDate, setPivotDate] = useState(new Date());
    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth()+1}월`;

    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()-1));
    }
    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(),pivotDate.getMonth()+1));
    }

    useEffect(()=>{
        if(data.length>=1) {
            const {beginTimeStamp, endTimeStamp}  =getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter((it)=>beginTimeStamp <= it.date && it.date <=endTimeStamp)
            );
        }
        else {
            setFilteredData([]);
        }
    }, [data,pivotDate]);

    return (
        <>
            <div>
                <Header 
                    title={headerTitle} 
                    leftchild={<Button text = "<" onClick={onDecreaseMonth}/>} 
                    rightchild={<Button text = ">" onClick={onIncreaseMonth}/>}
                />
                <DiaryList data={filteredData}/>
            </div>          
        </>
    );
}


export default Home;