import './Graph.css';
import React, { useContext } from 'react';
import { DiaryStateContext } from '../App';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import Header from './Header';
import Button from './Button';
import { useNavigate } from 'react-router-dom';


const Graph = () => {
  const navigate = useNavigate();
  const goBack = () => { navigate('/') };
  const goMonthly = () => { navigate(`/graph_monthly`) };
  const data = useContext(DiaryStateContext);
  const emotion_colors = ['#64c964', '#9dd772', '#FDce17', '#fd8446', '#fd565f'];
  
  // 1. 감정 상태 라벨 정의
  const emotion_labels = ['완전좋음', '좋음', '보통', '나쁨', '완전 나쁨'];

  const stats = [1, 2, 3, 4, 5].map((id, index) => ({
    // 2. name을 '1점' 대신 정의한 라벨로 변경
    name: emotion_labels[index], 
    count: data.filter((item) => item.emotionId === id).length,
  }));

  return (
    <div className="Graph">
      <Header
        leftchild={<Button text={'< 뒤로가기'} onClick={goBack}/>}
        rightchild={<Button text={'월별 감정 그래프'} onClick={goMonthly}/>}
      />
      <h3 className="graph-title">감정 통계 총합 그래프</h3>
      <div className="graph-container" style={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats} margin={{ top: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {stats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={emotion_colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="graph-description">* 감정 상태별 일기 기록 수입니다.</p>
    </div>
  );
};

export default Graph;