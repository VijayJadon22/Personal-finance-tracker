import axios from "./axios";

const generateReport = async () => {
    const res = await axios.post("/reports/generate");
    return res.data;
};

export default generateReport;
