import axios from "axios";

function postAPI(url, paramCondition, callback) {
    axios.post(url, paramCondition, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (callback !== undefined) {
                callback(response.data)
            } else {
                console.log("Dữ liệu được trả về: ")
                console.log(response.data)
            };
        })
        .catch(error => {
            console.log(error);
        });
}
export default postAPI