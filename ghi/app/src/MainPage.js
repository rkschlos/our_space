import styles from "./Main.module.css"

function MainPage() {
    return (
      <>
        <div className="main-hero-image shadow">
          <div className="main-overlay">
            <h1 className="display-5 fw-bold">OurSpace</h1>
            
            <div className="container">

              <p className="mb-4 text-center">
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
  