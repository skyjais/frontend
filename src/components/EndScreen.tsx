import React from 'react';

interface EndScreenProps {
  bananas: number;
  time: number;
}

export const EndScreen: React.FC<EndScreenProps> = ({ bananas , time }) => {
  return (
    <div className="end-screen" style={{display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"
,width:"800px", height:"500px"

    }} >
      <h1 style={{ fontFamily: "Nunito Sans, sans-serif",color:"#00bfff",fontWeight:"bold"}} >Congratulations!</h1>
      <h2 style={{ fontFamily: "Nunito Sans, sans-serif",color:"red", width:"400px",fontWeight:"bold" }} >You collected {bananas} bananas!</h2>
      <h2 style={{ fontFamily: "Nunito Sans, sans-serif",color:"red", width:"400px",fontWeight:"bold"}} >Time taken: {Math.floor(time / 60)}:{('0' + time % 60).slice(-2)}</h2>
      <img src="../assets/happymon.svg" alt="Banana" style={{width:"500px", height:"250px"}} />
    </div>
  );
};
