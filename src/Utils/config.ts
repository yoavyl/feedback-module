class Config {
    public urls = {
        feedback: ""
    }

    public constructor(baseUrl: string) {
        this.urls = {
            feedback: baseUrl + "feedback/",
        }
    }
}

// lean config, same for development and production
const config = new Config("https://6239be97bbe20c3f66c93c18.mockapi.io/api/v1/");

export default config;

