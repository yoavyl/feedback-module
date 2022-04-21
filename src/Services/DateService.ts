class DateService {

    // formats date from the mockup API format to a presentable format
    public presentableDate(date: string): string {
        const day = date.slice(8, 10);
        const month = date.slice(5, 7);
        const year = date.slice(0, 4);
        const hour = date.slice(11, 13);
        const minute = date.slice(14, 16);
        const second = date.slice(17, 19);
        const format = day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second; 
        return format;
    }

}

const dateService = new DateService();

export default dateService;
