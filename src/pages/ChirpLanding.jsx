import { useState, useEffect } from "react";
import styles from "./ChirpLanding.module.css";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import LearnMore from "../components/LearnMore";
const ChirpLanding = () => {
  const { dark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showLearnMore, setShowLearnMore] = useState(false);

  return (
    <div className={styles.landingPage}>
      <div className={styles.heroDiv}>
       <h1>
  Capture your thoughts instantly with{" "}
  <span className={styles.sp}>PocketNotes</span>
</h1>
<p>
  The simplest, fastest way to jot down ideas, organize notes, 
  and keep your thoughts with you wherever you go.
</p>

        <div className={styles.heroButtons}>
          <button onClick={(e)=>{e.preventDefault;navigate("/register")}} className={`${styles.btn} ${styles.registerBtn}`}>
            Get Started
          </button>
          <button onClick={() => setShowLearnMore(true)} className={`${styles.btn} ${styles.outlineBtn}`}>
            Learn More
          </button>
          {showLearnMore && <LearnMore onClose={() => setShowLearnMore(false)} />}
        </div>
      </div>
      <div className={styles.landingContent}>
        <div className={`${styles.chatPreview} ${dark? styles.chatPreviewDark : styles.chatPreviewLight}`}>
          <div className={styles.chatBubbleLeft}>Hey there! 👋</div>
          <div className={styles.chatBubbleRight}>
            Hello! Ready to Take Notes? 📝
          </div>
          <div className={styles.chatBubbleLeft}>
            Absolutely! This app is amazing!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChirpLanding;
