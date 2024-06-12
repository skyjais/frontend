import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const progressBarStyle = {
    height: '27px',
    width: '600px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
    marginTop: '20px',
    
  };

  const fillerStyle = {
    height: '30px',
    width: `${progress}%`,
    backgroundColor:  'rgba(255,212,34,255)',
    transition: 'width 0.9s ease-in-out',
    
  };

  return (
    
    <div style={progressBarStyle}>
      <div style={fillerStyle}  > <span style={{fontWeight:'bold',fontFamily:"Nunito Sans, sans-serif",color:"rgb(17, 174, 198, 1)"}} > Progress....{progress}%</span> </div>
    
    </div>
  );
};

export default ProgressBar;
