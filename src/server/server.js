const express = require("express")
const app = express()
const http = require("http")
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const cors = require("cors")
const methodOverride = require('method-override');
const server = http.createServer(app);
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });
const fs = require("fs")
const path = require('path');
const route = require("../server/app/routes/index")

// server sẽ chạy ở port 5000
server.listen(5000, () => {
    console.log("Listening at port 5000")
})

// kết nối database
async function connectDB() {

    // connect tới database blog
    try {
        await mongoose.connect(`mongodb://127.0.0.1/my_database`, {
            dbName: "mobile-app",
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log("Connect database Successfully")
    } catch (error) {
        console.log("Connect blog Failure!")
    }

    // connect tới database collection

}
connectDB()

// cấu hình cái này để sử dụng ảnh
app.use(express.static(path.join(__dirname, "public")));
// cấu hình cái này để chuyển dổi dữ liệu khi chuyển lên client
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// cấu hình cái này là fix lỗi cors, chỉ sử dụng trong quá trình phát triển
app.use(cors());
// sử dụng method override để có thể gửi đi với phương thức put patch delete
app.use(methodOverride('_method'));









// sử dụng
route(app)











const IP = "192.168.1.6"
const { Server } = require("socket.io")
const io = new Server(server, {
    // Cấu hình socket.io sử dụng đường dẫn /socket.io
    path: '/socket.io',
    cors: {
        origin: `http://${IP}:19000`,
        methods: ["GET", "POST"]
    }
})
// Thay đổi giá trị origins tại địa chỉ socket.io
// dưới đây là phần xử lí số liệu
// input: khoảng cách, gió, hướng gió, độ cao, chênh lệch độ cao




const online_members = []
io.on('connection', (socket) => {
    let distance = 0
    let windy = 0
    let height = 0

    let windyWay = "forward"
    let differenceHeight = "more"
    // ouput: góc, lực
    let angle
    let force

    let totalPart = 0

    let checkDistance = () => {
        // khoảng cách sẽ không phân biệt gió ngược hay thuận
        // nghĩ đơn giản, nó sẽ là khoảng cách từ       TÔI  =>  BẠN
        // lấy khoảng cách mà người dùng nhập vào

        // tính phần dư của khoảng cách
        let mainDistance = Math.floor(distance)
        // tính phần chẵn của khoảng cách
        let redundantDistance = Math.round((distance - mainDistance) * 10) / 10
        // trừ góc bắn đi, mỗi 1m = 1 góc
        angle -= mainDistance
        // mỗi 0.2m dư thì cộng thêm 1 lực dư
        for (let i = 0; i < Math.floor(redundantDistance / 0.2); i++) {
            totalPart += 1
        }
        if (distance > 20) {
            force = 97
        }
    }
    let checkWindy = () => {
        // lấy lực gió mà người dùng nhập

        // tính phần dư của gió, vd: 1.3 thì lấy ra 0.3
        let redundantWind = (windy * 10) % 5
        // tính phần chẵn của gió, vd: 1.3 thì lấy ra 2
        let mainWind = Math.floor((windy * 10) / 5)
        // trường hợp gió thuận
        if (windyWay === "forward") {
            // ở đây có thể sai, lưu ý
            totalPart -= Number(redundantWind)
            // cái này đúng
            //
            angle += mainWind
        }
        // trường hợp gió ngược
        else {
            // ở đây có thể sai, lưu ý
            totalPart += Number(redundantWind)
            // cái này đúng
            //
            angle -= mainWind
        }
    }
    let checkHeight = () => {
        // lấy giá trị độ cao chênh lệch mà người dùng nhập

        // lấy phần chẵn của độ cao
        let mainHeight = Math.floor(height / 5)
        let copyTheHeight = height
        // lấy phần dư của độ cao
        let redundantHeight

        // nếu height lớn hơn 5 thì mới trừ ra để lấy phần dư, không thì thôi
        if (height >= 5) {
            // mỗi 5m thì trừ ra và lấy phần dư
            for (let i = 0; i < mainHeight; i++) {
                copyTheHeight -= 5
                redundantHeight = Math.round(copyTheHeight * 10) / 10
            }
        } else {
            redundantHeight = height
        }
        // trường hợp độ cao    TÔI > BẠN
        if (differenceHeight === "more") {
            angle += mainHeight
            totalPart -= Number(redundantHeight)
        }
        // trường hợp độ cao    BẠN > TÔI
        else {
            angle -= mainHeight
            totalPart += Number(redundantHeight)
        }
    }
    let checkAngleAndForce = () => {
        if (windy >= 4.5 && windyWay === "forward") {
            force -= 2
        }
        if (distance >= 20 && height >= 7) {
            force -= 3
        }
        if (totalPart > 0) {
            force += totalPart

            for (let i = 0; i <= Math.floor((force - 100) / 5); i++) {
                if (force - 100 > 0) {
                    force -= 5
                    angle -= 1
                }
            }

        }
    }
    let handleDataFromClient = () => {
        totalPart = 0
        angle = 90
        // lực bắn mặc định là tương đối
        force = 96.5
        // kiểm tra khoảng cách giữa    TÔI => BẠN
        // kiểm tra khoảng cách
        checkDistance()
        // kiểm tra sức gió
        checkWindy()
        // kiểm tra độ cao
        checkHeight()
        // tính toán góc và lực
        checkAngleAndForce()
    }
    let getDataFromClient = (data) => {
        if (data.type === "distance") {
            distance = data.value
        }
        if (data.type === "windy") {
            windy = data.value
        }
        if (data.type === "height") {
            height = data.value
        }
    }
    console.log(`${socket.id}   connected`);
    // lắng nghe sự kiện client disconnect server
    socket.on("disconnect", () => {
        console.log(`${socket.id}  disconnected`)
        let index = online_members.findIndex((user) => {
            return user.id === socket.id
        })
        online_members.splice(index, 1)
        // io.sockets.emit("Server-send-online-members", online_members)
    })
    // lắng nghe hướng gió mà người dùng chọn
    socket.on("Client-send-windyWay", (wayData) => {
        windyWay = wayData
        handleDataFromClient()

        // trả dữ liệu cho client
        socket.emit("Server-send-AngleAndForce", {
            angle: angle,
            reserveAngle: (180 - angle),
            force: force
        })
    })
    // lắng nghe sự chênh lệch độ cao mà người dùng nhập
    socket.on("Client-send-differenceHeight", (difference) => {
        differenceHeight = difference
        handleDataFromClient()
        // trả dữ liệu cho client
        socket.emit("Server-send-AngleAndForce", {
            angle: angle,
            reserveAngle: (180 - angle),
            force: force
        })
    })
    // lắng nghe data gửi về, bao gồm: khoảng cách, gió, độ cao
    // !important
    socket.on("Client-send-data", (data) => {
        // nhận và xử lí dữ liệu của client gửi về
        getDataFromClient(data)
        // xử lí dữ liệu để trả lại cho client
        handleDataFromClient()
        // trả dữ liệu cho client
        socket.emit("Server-send-AngleAndForce", {
            angle: angle,
            reserveAngle: (180 - angle),
            force: force
        })
    })
    // lắng nghe tài khoản và mật khẩu mà người dùng đăng nhập để xác thực và trả ra _id của nó trong database
    socket.on("Client-send-request-login", (data) => {
        let nickname = data.nickname
        let password = data.password
        // tiến hành kiểm tra trong database và cấp accessToken và client
        // lấy ra tất cả bản ghi User
        User.find({})
            .then((list) => {
                // bây giờ lọc, lấy ra phần tử có nickname trùng với nickname người dùng nhập
                let findNicknameUser = list.filter(user => user.nickname === nickname)
                if (findNicknameUser[0].password === password) {
                    
                    socket.emit("Server-send-accessToken", {
                        accessToken: true,
                        message: "Đăng nhập thành công",
                        userData: findNicknameUser[0],
                        socketId: socket.id
                    })
                    socket.emit("Server-send-success-status", {
                        status: 200,
                        id: findNicknameUser[0].name
                    })
                    online_members.push({
                        id: socket.id,
                        name: findNicknameUser[0].name
                    })

                }
            })
            .catch(() => {
                socket.emit("Server-send-error", {
                    message: "Đăng nhập thất bại!!"
                })
            })
    })
    // lắng nghe người dùng gửi userId để đăng nhập!!
    socket.on("Client-send-userId", (data) => {
        User.findById(data.id)
            .then((data) => {
                socket.emit("Server-send-accessToken", {
                    accessToken: true,
                    message: "Đăng nhập thành công",
                    userData: data,
                    socketID: socket.id
                })
                online_members.push({
                    id: socket.id,
                    name: data.name
                })
            })
    })
    // PHẦN CODE DÀNH CHO CHAT REAL-TIME
    socket.on("Client-request-online-members", () => {
        io.sockets.emit("Server-send-online-members", online_members)
    })
    // lắng nghe sự kiện người dùng đăng xuất
    socket.on("Client-request-logout", () => {
        let index = online_members.findIndex((user) => {
            return user.id === socket.id
        })
        online_members.splice(index, 1)
        io.sockets.emit("Server-send-online-members", online_members)
    })
    // lắng nghe sự kiện người dùng gửi tin nhắn cho TẤT CẢ MỌI NGƯỜI
    socket.on("Client-send-message-all", (data) => {
        io.sockets.emit("Server-send-message", {
            name: data.name,
            img: data.img,
            from: data.from,
            message: data.message,
        })
    })
    // lắng nghe người dùng gửi tin nhắn riêng tư cho ai đó
    socket.on("Client-send-message-private", (data) => {
        io.to(data.to).emit("Server-send-message", {
            name: data.name,
            img: data.img,
            from: data.from,
            message: data.message,
        })
    })

















    // làm chức năng thêm người chơi trong random game
    socket.on("Client-send-playerList", (list) => {
        console.log(list)
        socket.emit("Server-send-playerList", list)
    })
});







