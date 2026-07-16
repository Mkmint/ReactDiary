import './App.css'
import { getEmotionImgById } from './components/util';
import { Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Edit from './components/Edit';
import New from './components/New';
import Diary from './components/Diary';
import React, { useReducer, useRef, useState, useEffect} from 'react';
import {mockData} from './components/mockData';
import Graph from './components/Graph';
import Graph_Monthly from './components/Graph_Monthly';
import Graph_Modal from './components/Graph_Modal';

//정적상태(diary data)
export const DiaryStateContext = React.createContext();

//동적상태(crud 기능)
export const DiaryDispatchContext = React.createContext();


const reducer = (state,action) => {
  switch(action.type) {
    case "CREATE" : return [action.data, ...state];
    case "UPDATE" : return state.map((it)=>it.id === action.data.id ? {...action.data} : it);
    case "DELETE" : return state.filter((it)=>String(it.id) !==String(action.targetId));
    case "INIT" : return action.data;
    default: return state;
  }
  
}

const App = () => {
  
  //초기데이터 로딩여부 체크
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [data,dispatch] = useReducer(reducer, []);
  
  const idRef = useRef(mockData[length]);
  const onCreate = (date,content,emotionId) => {
    dispatch({type:"CREATE",
      data:{
        id : idRef.current,
        date : new Date(date).getTime(),
        content,
        emotionId
      }
    });
    idRef.current += 1;
  };
  const onUpdate = (targetId,date,content,emotionId) => {
    dispatch({type:"UPDATE",
      data :{
        id:targetId,
        date:new Date(date).getTime(),
        content,
        emotionId
      }
    });
  };
  const onDelete = (targetId) => {
    dispatch({type:"DELETE",
      targetId
      })
    };
  
  useEffect(()=>{
    dispatch({
      type:"INIT",
      data:mockData
    })
    setIsDataLoaded(true);
  },[]);

  if(!isDataLoaded) return <div>데이터 로!딩중</div>;

  return (
    <>
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value ={{onCreate,onUpdate,onDelete}}>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/new' element={<New/>}></Route>
          <Route path='/diary/:id' element={<Diary/>}></Route>
          <Route path='/edit/:id' element={<Edit/>}></Route>
          <Route path='/graph' element={<Graph/>}></Route>
          <Route path='/graph_monthly' element={<Graph_Monthly/>}></Route>
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>


    </>);
}

export default App;
