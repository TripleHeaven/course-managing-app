// библиотеки и утилиты
import cors from "cors";
import express, { json, urlencoded } from "express";
import helmet from "helmet";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
// настройки
import { developmentConfig, productionConfig } from "./config/index.js";
// роуты
import apiRoutes from "./routes/api.routes.js";
// обработчик ошибок
import onError from "./utils/onError.js";
import { UserRouter } from "./controllers/user/UserRouter.js";

import mongoose from "mongoose";

// путь к текущей директории
const __dirname = dirname(fileURLToPath(import.meta.url));

// определяем режим
const isProduction = process.env.NODE_ENV === "production";

// выбираем настройки
let config;
if (isProduction) {
  config = productionConfig;
} else {
  config = developmentConfig;
}

// создаем экземпляр приложения
const app = express();

// устанавливаем заголовки, связанные с безопасностью
app.use(helmet());
// устанавливаем заголовки, связанные с CORS
app.use(
  cors({
    // сервер будет обрабатывать запросы только из разрешенного источника
    origin: config.allowedOrigin,
  })
);
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

// роут not found
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});
// обработчик ошибок
app.use(onError);

// запуск сервера
app.listen(config.port, async () => {
  try {
    console.log("URL TEST", process.env.DATABASE_URL);

    // await mongoose.connect(process.env.DATABASE_URL ?? "");

    console.log("🚀 Server ready to handle requests");
  } catch (e) {
    console.error(e);
  }
});
