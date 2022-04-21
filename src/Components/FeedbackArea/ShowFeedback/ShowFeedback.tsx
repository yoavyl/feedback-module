import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import FeedbackModel from "../../../Models/FeedbackModel";
import feedbackService from "../../../Services/FeedbackService";
import dateService from "../../../Services/DateService";
import "./ShowFeedback.css";

interface ShowFeedbackProps {
    setIsEditRequest: (arg: boolean) => void; 
    setStateFeedback: (arg: FeedbackModel) => void;
    stateFeedback: FeedbackModel;
}

function ShowFeedback(props: ShowFeedbackProps): JSX.Element {
    
    // delete feedback
    async function deleteFeedback() {
        try {
            await feedbackService.deleteFeedback(props.stateFeedback.id);
            props.setStateFeedback(undefined);
        } catch(err:any) {
            // no notification in development
        }
    }

    return (
        <div className="ShowFeedback">
            <div className="FeedbackContainer">
                <aside>
                </aside>

                <main>
                    <h4 className="TopMessage"> Your feedback was updated! </h4>
                    <u>Feedback #{props.stateFeedback?.id}:</u>
                    <br />
                    Is this page helpful?&nbsp;
                    {props.stateFeedback?.wasHelpful ? <><AiOutlineLike className="Icons" /> Yes </> : <> <AiOutlineDislike className="Icons"/> No </>}
                    <br />
                    <div className="FeedbackBox">
                        "{props.stateFeedback?.comment}"
                        <br />
                    </div>
                    - {dateService.presentableDate(props.stateFeedback?.createdAt)}
                    <div className="Bottons">
                    <button type="button" className="SkipBtn">
                            Skip
                        </button>
                        &nbsp;
                        <button type="button" className="SecondBtn" onClick={() => {
                            deleteFeedback();
                        }}>
                            Delete
                        </button>
                        &nbsp;
                        <button className="MainBtn" onClick={() => {
                            props.setIsEditRequest(true);
                        }}>
                            Edit
                        </button>
                    </div>
                </main>
                <aside>
                    
                </aside>
            </div>
        </div>
    );
}

export default ShowFeedback;
