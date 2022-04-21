import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import FeedbackModel from "../../../Models/FeedbackModel";
import feedbackService from "../../../Services/FeedbackService";
import "./SubmitFeedback.css";
import "@fontsource/titillium-web"; 


interface SubmitFeedbackProps {
    setIsEditRequest: (arg: boolean) => void;
    setStateFeedback: (arg: FeedbackModel) => void;
    stateFeedback: FeedbackModel;
}

function SubmitFeedback(props: SubmitFeedbackProps): JSX.Element {

    const [clickYesNo, setClickYesNo] = useState<boolean>(undefined); // whether user clicked "Yes" or "No", relvant for different styling
    const [isHelpful, setIsHelpful] = useState<boolean>(props.stateFeedback?.wasHelpful); // user has to opt-in (click "Yes") in order for posted feedback to be marked "Helpful"

    const { register, handleSubmit, formState, setValue } = useForm<FeedbackModel>(); 

    // for update purposes
    useEffect( () => {
        if (props.stateFeedback) {setClickYesNo(true);}
        setValue("comment", props.stateFeedback?.comment);
    }, [] );

    // if user clicks "Yes"
    function helpful() {
        setIsHelpful(true);
        setClickYesNo(true);
    }

    // if user clicks "No"
    function notHelpful() {
        setIsHelpful(false);
        setClickYesNo(true);
    }

    // post / update feedback
    async function submit(feedback: FeedbackModel) {
        // no "register" for that, so assign user's choice
        feedback.wasHelpful = isHelpful;
        try {
            if (!props.stateFeedback) { // if there is no feedback in state already, post new feedback
                const addedFeedback = await feedbackService.addFeedback(feedback);

                // i pass the data this way to the parent (FeedbackCard) so it can update the state and pass to the sibling (ShowFeedback)
                feedback.id = addedFeedback.id;
                feedback.createdAt = addedFeedback.createdAt;
            } else { // if there is already feedback in state, update it
                feedback.id = props.stateFeedback.id;
                feedback.createdAt = props.stateFeedback.createdAt;
                const updatedFeedback = await feedbackService.updateFeedback(feedback);
                props.setIsEditRequest(false); // close edit request          
            }
            // in case the user didn't pick "yes" or "no", "submit" is like clicking "no"
        setClickYesNo(true); // even if user didn't click "yes" or "no" before posting/updating
        props.setStateFeedback(feedback); // update parent's state
        } catch(err:any) {
            // no notification in development
        }
    }

    return (
        <div className="SubmitFeedback">
            <div className="FeedbackContainer">
                <aside> 
                </aside>
                <main>
                    <form onSubmit={handleSubmit(submit)}>

                        <h4 className="TopMessage">Is this page helpful?</h4>

                        <div className="YesNo">
                            <label htmlFor="yes" className="Yes">
                                <input
                                    onChange={() => {
                                        helpful();
                                    }}
                                    type="radio"
                                    name="isHelpful"
                                    id="yes"
                                />
                                <AiOutlineLike className={(!isHelpful && clickYesNo) ? 'ColorGrey Icons' : 'ColorBlack Icons'} />
                                <span className={(!isHelpful && clickYesNo) ? 'ColorBlackish Icons' : 'ColorBlack Icons'}> Yes </span>


                            </label>
                            <label htmlFor="no"  className="No">
                                <input
                                    onChange={() => {
                                        notHelpful()
                                    }}
                                    type="radio"
                                    name="isHelpful"
                                    id="no"
                                />
                                <AiOutlineDislike className={isHelpful ? 'ColorGrey Icons' : 'ColorBlack Icons'} /> 
                                <span className={isHelpful ? 'ColorBlackish Icons' : 'ColorBlack Icons'}> No </span>
                            </label>
                        </div>
                        <textarea placeholder="Any additional feedback?" {...register("comment",
                            {required:  "You must insert feedback"})} />
                        <span className="ErrorMsg">{formState.errors.comment?.message}</span>
                        <br />

                        <div className="Buttons">
                            <button type="button" className="SkipBtn">
                                Skip
                            </button>
                            &nbsp;
                            <button className="MainBtn">
                                {props.stateFeedback ? "Update" : "Submit"}
                            </button>
                        </div>
                        
                    </form>
                </main>
                <aside>
                    
                </aside>
            </div>
        </div>
    );
}

export default SubmitFeedback;

