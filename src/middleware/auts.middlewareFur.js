import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { HttpException } from "../utils/http.exception.js";
import { asyncHandler } from "./asynnc-handler.middleware.js";
import { JwtHelper } from "../utils/jwt.helper.js";
import { FurUser } from "../models/Admin/user.models.js"
import { User } from "../models/user/user.model.js";


export const authF = asyncHandler(async (req, res, next) => {
    // let token;

    // if (req.headers.authorization?.startsWith('Bearer')) {
    //     token = req.headers.authorization.split(" ")[1];
    // }

    let token;
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(" ")[1];
} else {
    throw new HttpException(
        StatusCodes.UNAUTHORIZED,
        ReasonPhrases.UNAUTHORIZED,
        "Token mavjud emas!"
    );
}


    if (!token) {
        throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED,
            "Token topilmadi!",
            console.log(token + " token topilmadi !")
        );
    }

    const decoded = JwtHelper.verify(token);

    if (!decoded) {
        throw new HttpException(
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED,
            "Token noto'g'ri!",
            console.log(decoded + " decoded topilmadi !")
        );
    }

    if (decoded.role === 'admin') {

        const adminUser = await User.findById(decoded.id) || await FurUser.findById(decoded.id);
        if (!adminUser) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                "Admin foydalanuvchi topilmadi!"
            );
        }
     
        if (req.body.userId) {
            const user = await User.findById(req.body.userId) || await FurUser.findById(req.body.userId);
            if (!user) {
                throw new HttpException(
                    StatusCodes.UNAUTHORIZED,
                    ReasonPhrases.UNAUTHORIZED,
                    "Bunday foydalanuvchi topilmadi!"
                );
            }
            req.body.user = user; 
        } else {
            req.body.user = adminUser; 
        }
     } else {
        const user = await FurUser.findById(decoded.id) || await User.findById(decoded.id);
        if (!user) {
            throw new HttpException(
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED,
                "Foydalanuvchi topilmadi!"
            );
        }
        req.body.user = user; 
     }

    next();  
});

// export const authF = asyncHandler(async (req, res, next) => {
//     let token;

//     if (req.headers.authorization?.startsWith('Bearer')) {
//         token = req.headers.authorization.split(" ")[1];
//     }

//     console.log(token, ' user tokeni');
    

//     if (!token) {
//         console.log("Token topilmadi!");
//         throw new HttpException(
//             StatusCodes.UNAUTHORIZED,
//             ReasonPhrases.UNAUTHORIZED,
//             "Token topilmadi!"
//         );
//     }

//     const decoded = JwtHelper.verify(token);

//     if (!decoded) {
//         console.log("Token noto'g'ri!");
//         throw new HttpException(
//             StatusCodes.UNAUTHORIZED,
//             ReasonPhrases.UNAUTHORIZED,
//             "Token noto'g'ri!"
//         );
//     }

//     const user = await FurUser.findById(decoded.id);
//     console.log(user, token, 'bular token va user');
    

//     if (!user) {
//         console.log("Foydalanuvchi topilmadi!");
//         throw new HttpException(
//             StatusCodes.UNAUTHORIZED,
//             ReasonPhrases.UNAUTHORIZED,
//             "Foydalanuvchi topilmadi!"
//         );
//     }

//     next();  
// });