import './Graph_Monthly.css';
import React, { useContext, useState, useMemo } from 'react';
import { DiaryStateContext } from '../App';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import Header from './Header';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Graph_Monthly = () => {
  const navigate = useNavigate();
  const data = useContext(DiaryStateContext);
  const [curDate, setCurDate] = useState(new Date());
  const emotion_colors = ['#64c964', '#9dd772', '#FDce17', '#fd8446', '#fd565f'];
  // 1. 감정 상태 라벨 정의
  const emotion_labels = ['완전좋음', '좋음', '보통', '나쁨', '완전 나쁨'];

  // 현재 달의 데이터만 필터링 및 통계 생성
  const monthlyStats = useMemo(() => {
    const year = curDate.getFullYear();
    const month = curDate.getMonth();

    const filteredData = data.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate.getFullYear() === year && itemDate.getMonth() === month;
    });

    // 2. id와 index를 사용해 라벨 적용
    return [1, 2, 3, 4, 5].map((id, index) => ({
      name: emotion_labels[index], 
      count: filteredData.filter((item) => item.emotionId === id).length,
    }));
  }, [data, curDate]);

  const maxEmotions = useMemo(() => {
    const maxCount = Math.max(...monthlyStats.map((it) => it.count));
    if (maxCount === 0) return [];
    return monthlyStats.filter((it) => it.count === maxCount);
  }, [monthlyStats]);

  const headertitle = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  const decreaseMonth = () => setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
  const increaseMonth = () => setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));

  return (
    <div className="Graph">
      <Header
        title={headertitle}
        leftchild={<Button text={'< 뒤로'} onClick={() => navigate('/')}/>}
        rightchild={<Button text={'총합 보기'} onClick={() => navigate('/graph')}/>}
      />
      
      <div className="month-control" style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px' }}>
        <Button text={'◀ 이전 달'} onClick={decreaseMonth} />
        <Button text={'다음 달 ▶'} onClick={increaseMonth} />
      </div>

      <div className="graph-container" style={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyStats} margin={{ top: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {monthlyStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={emotion_colors[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 가장 많은 감정 출력 부분도 라벨에 맞춰 수정 */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {maxEmotions.length > 0 ? (
          <div>
            <strong>이번 달에 가장 많이 느낀 감정: </strong>
            {maxEmotions.map((it, idx) => (
              <span key={it.name} style={{ color: emotion_colors[emotion_labels.indexOf(it.name)], fontWeight: 'bold', margin: '0 5px' }}>
                {it.name}({it.count}회)
              </span>
            ))}
          </div>
        ) : (
          <p>이번 달에는 아직 기록된 감정이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Graph_Monthly;