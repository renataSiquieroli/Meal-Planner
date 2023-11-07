import "../Styles/Banner.css";

export default function BannerImg() {
  return (
    <>
      <div className="banner-logo">
        <hr />
        <img src="/logo.png" alt="Logo" />
      </div>
      <div className="banner-title">
        <h2>neat meal planner, just plan it !</h2>
        <hr />
      </div>
      <div className="banner-wrap">
        <h1>How to use :</h1>
        <div className="steps-container">
          <div className="steps">
            <img src="/step-1.png" alt="step 01" />
            <br />
            <span className="step-text">Choose a recipe for your meal</span>
          </div>
          <div className="steps">
            <img src="/step-2.png" alt="step 02" />
            <br />
            <span className="step-text">Select a day to make a plan</span>
          </div>
          <div className="steps">
            <img src="/step-3.png" alt="step 03" />
            <br />
            <span className="step-text">Bon Appetit!</span>
          </div>
        </div>
      </div>
      <div className="bottom-banner">
        <h1>Healthy, hearty meals await.</h1>
        <img src="" alt="" />
      </div>
    </>
  );
}
