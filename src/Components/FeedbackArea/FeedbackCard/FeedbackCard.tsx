import { useState } from "react";
import "./FeedbackCard.css";
import ShowFeedback from "../ShowFeedback/ShowFeedback";
import SubmitFeedback from "../SubmitFeedback/SubmitFeedback";
import "@fontsource/titillium-web"; 
import FeedbackModel from "../../../Models/FeedbackModel";

function FeedbackCard(): JSX.Element {

    const [isEditRequest, setIsEditRequest] = useState<boolean>(false); // indicated whether user wants to edit feedback
    const [stateFeedback, setStateFeedback] = useState<FeedbackModel>();
    
    return (
        <div className="FeedbackCard">

            {/* if there is feedback in state, and there is no request to edit, show the feedback in state */}
            {(stateFeedback && !isEditRequest) &&
                <ShowFeedback setStateFeedback={setStateFeedback} 
                stateFeedback={stateFeedback} setIsEditRequest={setIsEditRequest} />
            }

            {/* if there is no feedback in state, or there is request to edit, show form */}
            {(!stateFeedback || isEditRequest) &&
                <SubmitFeedback setStateFeedback={setStateFeedback} 
                stateFeedback={stateFeedback} setIsEditRequest={setIsEditRequest} />
            } 

        </div>
        );
    }
    

export default FeedbackCard;

