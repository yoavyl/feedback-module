import axios from "axios";
import FeedbackModel from "../Models/FeedbackModel";
import config from "../Utils/config";

class FeedbacksService {

    // add feedback to mockup API
    public async addFeedback(feedback: FeedbackModel): Promise<FeedbackModel> {
        const response = await axios.post<FeedbackModel>(config.urls.feedback, feedback);
        const addedFeedback = response.data;
        return addedFeedback;
    }

    // update feedback in mockup API
    public async updateFeedback(feedback: FeedbackModel): Promise<FeedbackModel> {
        const response = await axios.put<FeedbackModel>(config.urls.feedback + feedback.id, feedback);
        const updatedFeedback = response.data;
        return updatedFeedback;
    }

    // delete feedback from mockup API
    public async deleteFeedback(id: string): Promise<void> {
        await axios.delete(config.urls.feedback + id);
    }

}

const feedbacksService = new FeedbacksService();

export default feedbacksService;