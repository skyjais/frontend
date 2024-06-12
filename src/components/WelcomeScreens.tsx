import React, { useEffect, useState } from "react";
import "./WelcomeScreens.css";

const WelcomeScreens: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [screen, setScreen] = useState<number>(() => {
    const savedScreen = localStorage.getItem("welcomeScreen");
    return savedScreen ? parseInt(savedScreen, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem("welcomeScreen", screen.toString());
  }, [screen]);

  const nextScreen = () => setScreen(screen + 1);
  const prevScreen = () => setScreen(screen - 1);

  return (
    <div className="welcome-container">
      {screen === 1 && (
        <div className="welcome-screen">
          <div className="mondiv">
            <img src="../assets/mon.svg" alt="" />
          </div>

          <div className="image-container">
            <img src="../assets/helocloud.svg" alt="" />
            <h1>Welcome Kiddo ! </h1>
          </div>
          <button onClick={nextScreen}>
            {" "}
            <img src="../assets/startbutton.svg" alt="img" />
          </button>
        </div>
      )}
      {screen === 2 && (
        <div className="welcome-screen2">
          <button className="nav-button" onClick={prevScreen}>
            {" "}
            <img src="../assets/back.svg" alt="" />{" "}
          </button>
          <div className="mondiv2">
            <img src="../assets/mon.svg" alt="" />
          </div>
          <div className="image-container2">
            <img src="../assets/helocloud.svg" alt="Monkey" />
            <h1>
              Hi, I am Mizzo ! <br /> and I love bananas
            </h1>
          </div>

          <div className="nextbtn">
            <button onClick={nextScreen}>
              {" "}
              <img src="../assets/next.svg" alt="" />
            </button>
          </div>
        </div>
      )}
      {screen === 3 && (
        <div className="welcome-screen2">
          <button className="nav-button" onClick={prevScreen}>
            {" "}
            <img src="../assets/back.svg" alt="" />{" "}
          </button>
          <div className="mondiv2">
            <img src="../assets/mon.svg" alt="" />
          </div>
          <div className="image-container2">
            <img src="../assets/helocloud.svg" alt="Monkey" />
            <h1>
              Can you help me to <br /> get some ?
            </h1>
          </div>

          <div className="nextbtn">
            <button onClick={nextScreen}>
              {" "}
              <img src="../assets/Yes.svg" alt="" />{" "}
            </button>
          </div>
        </div>
      )}
      {screen === 4 && (
        <div className="welcome-screen4">
          <button className="nav-button4" onClick={prevScreen}>
            <img src="../assets/back.svg" alt="" />
          </button>
          {/* <h2>Here’s how you play the game:</h2> */}
          <div className="instruction-cards">
            {/* <div className="instruction-card">Instruction 1
            <div className="imgdiv"> <img src="" alt="" /> </div>


            </div> */}

            <div className="card-container-o">
              <div className="card-o">
                <div className="image-container-o">
                  <img
                    src="../assets/card.svg"
                    alt="Pink Card"
                    className="card-image-o"
                  />
                  <img
                    src="../assets/card1.svg"
                    alt="Apple"
                    className="apple-image"
                  />
                </div>
                <div className="card-content-o">
                  <div className="step-number">
                    <span>01</span>
                  </div>
                  <h2>
                    Select a <br /> pink card.
                  </h2>
                  <p>It has images.</p>
                </div>
              </div>
            </div>
            {/* <div className="instruction-card">Instruction 2</div> */}
            <div className="card-container-o">
              <div className="card-o">
                <div className="image-container-o">
                  <img
                    src="../assets/bcard.svg"
                    alt="Pink Card"
                    className="card-image-o"
                  />
                  {/* <img src="../assets/card1.svg" alt="Apple" className="apple-image"/> */}
                </div>
                <div className="card-content-o">
                  <div className="step-number">
                    <span>02</span>
                  </div>
                  <h2>
                    Select a <br /> blue card.
                  </h2>
                  <p>It has alphabets.</p>
                </div>
              </div>
            </div>
            {/* <div className="instruction-card">Instruction 3</div> */}
            <div className="card-container-o">
              <div className="card-o" style={{ height: "247px" }}>
                <div className="image- container-o">
                  <img
                    src="../assets/duo.svg"
                    alt="Pink Card"
                    className="card-image-o"
                  />
                  {/* <img src="../assets/card1.svg" alt="Apple" className="apple-image"/> */}
                </div>
                <div className="card-content-o">
                  <div className="step-number">
                    <span>03</span>
                  </div>
                  <p className="pclass">If they are same.</p>
                  <h2>Its a match !</h2>
                  <p>Otherwise retry :(</p>
                </div>
              </div>
            </div>
          </div>
          <div className="nextbtn4">
            <button onClick={onComplete}>
              <img src="../assets/play.svg" alt="" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeScreens;
