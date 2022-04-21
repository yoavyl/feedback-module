import "./Footer.css";

function Footer(): JSX.Element {

    return (
        <div className="Footer">
            <p>All rights reserved to Yoav Lifshitz &copy; - {yearAndMonth()}</p>
        </div>
    )
};

// this is not part of the feedback module, so it's not in DateService
function yearAndMonth(): string {
    const now = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = months[now.getMonth()];
    const currentYear = now.getFullYear();
    return currentMonth + " " + currentYear;
}

export default Footer;