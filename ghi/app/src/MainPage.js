import styles from "./MainPage.module.css"

function MainPage() {
    return (
      <>
        <div className="main-hero-image shadow">
          <div className="main-overlay">
            <h1 className={styles.title}>OurSpace</h1>
            
            <div className="container">

              <p className={styles.subtitle}>
                OurSpace is an inclusive social networking platform 
                for women and underrepresented individuals in the tech 
                industry to connect share experiences.
              </p>
            </div>
          </div>
        </div>
      </>

    );
  }
  
  export default MainPage;
  