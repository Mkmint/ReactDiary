import React from 'react';// 모달 스타일 시트
import './Graph_Modal.css';

const Graph_Modal = ({ isOpen, onClose, children }) => { // children 추가
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children} {/* 부모에서 전달받은 내용이 여기에 출력됨 */}
        <button onClick={onClose} style={{ marginTop: '20px' }}>닫기</button>
      </div>
    </div>
  );
};

export default Graph_Modal;