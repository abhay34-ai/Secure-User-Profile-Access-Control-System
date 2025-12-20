import "./Home.css";
import phoneImg from "../assets/home1.webp";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
    <Navbar/>
    <div className="home">
      <div className="home-left">
        <p className="since">Operating Since 2015</p>

        <h1>
          The Asset Class Your <br /> Portfolio Needs
        </h1>

        <p className="subtitle">
          Use peer-to-peer lending to build a steady income stream that isn’t
          affected by market ups and downs.
        </p>

        <div className="stats">
          <span>₹17,366 Cr disbursed</span>
          <span>3 Cr+ registered users</span>
          <span>Avg 24% p.a. Earned</span>
        </div>

        <div className="buttons">
          <button className="btn-primary">Get Started</button>
          <button className="btn-outline">How it Works</button>
        </div>

        <p className="note">Start with ₹25,000 • No account fee</p>
      </div>

      <div className="home-right">
        <img src={phoneImg} alt="Phone preview" />
      </div>
    </div>

    </>
  );
}

export default Home;
