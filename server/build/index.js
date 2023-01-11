// библиотеки и утилиты
import cors from "cors";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
// настройки
// роуты
import apiRoutes from "./routes/api.routes.js";
// обработчик ошибок
import onError from "./utils/onError.js";
import { UserRouter } from "./controllers/user/UserRouter.js";
import mongoose from "mongoose";
import { CourseRouter } from "./controllers/course/CourseRouter.js";
// путь к текущей директории
const __dirname = dirname(fileURLToPath(import.meta.url));
const localPort = process.env.PORT_LOCAL;
const prodPort = process.env.PORT_PROD;
// определяем режим
const isProduction = process.env.NODE_ENV === "production";
// создаем экземпляр приложения
const app = express();
// устанавливаем заголовки, связанные с безопасностью
app.use(helmet());
// устанавливаем заголовки, связанные с CORS
app.use(cors({
    // сервер будет обрабатывать запросы только из разрешенного источника
    origin: process.env.ALLOWED_ORIGIN_PROD || "http://localhost:8080",
}));
// преобразование тела запроса из JSON в обычный объект
app.use(json());
// разбор параметров строки запроса
app.use(urlencoded({ extended: true }));
// если сервер запущен в производственном режиме,
// сборка клиента обслуживается в качестве директории со статическими файлами
if (isProduction) {
    app.use(express.static(join(__dirname, "../../client/build")));
}
// роуты
app.use("/api", apiRoutes);
app.use("/api/user", UserRouter);
app.use("/api/course", CourseRouter);
// роут not found
app.use("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
});
// обработчик ошибок
app.use(onError);
// запуск сервера
app.listen(process.env.PORT || localPort, async () => {
    var _a;
    try {
        if (!process.env.DATABASE_URL) {
            throw new Error("Cannot connect to the database, environment base is null");
        }
        await mongoose.connect((_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : "");
        console.log("🚀 Server ready to handle requests\n started on port", process.env.PORT || localPort);
    }
    catch (e) {
        console.error(e);
    }
});
