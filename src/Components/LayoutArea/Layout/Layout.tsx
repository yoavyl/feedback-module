import FeedbackCard from "../../FeedbackArea/FeedbackCard/FeedbackCard";
import Footer from "../Footer/Footer";
import "./Layout.css";

function Layout(): JSX.Element {

    return (
        <div className="Layout">
            <header>
               
            </header>
            <main>
                <FeedbackCard />
                <div className="Bottom">
                    <a href="https://6239be97bbe20c3f66c93c18.mockapi.io/api/v1/feedback" target="_blank">
                        For development/testing purposes: See mockup API with all feedback 
                    </a>
                    <br/ >
                    <a href="https://www.figma.com/file/Ia9vrzunuUYHfxBMPepLHX/Tools-Team-Front-end?node-id=0%3A1" target="_blank">
                        For development/testing purposes: See mockup Figma page
                    </a>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>   
        </div>
    );
}

export default Layout;
