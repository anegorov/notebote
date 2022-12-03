# Installation

1. Install nodejs
2. sudo npm i -g typescript
3. tsc --init (This command creates tsconfig.json file. Set src and dist folders in tsconfig.json file.)
4. npm install telegraf
5. Get bot token and it works
6. npm install axios (library for http requests)
7. Create folder config and default.json file inside. 
8. Structure of default.json file
{
    "accessKeyId": "_",
    "secretAccessKey": "_",
    "bucket": "_",
    "token": "_:_"
} 

# Commands
### To add new or edit existing file
new {note name with path}

### To get list of existing notes
1. ls - returns all resources (files and folders) 
2. ls {path name} - returns resources in specified folder

### Delete file
1. del {note name with path} - delete specified file (example: del default/file_note.json)

### Read file
1. cat {note name with path}

### Append line to file
1. echo {text/message} - just return sent message
2. echo {text/message} >> {file name} - adding new line into bottom file

# Taks
1. Fix picture saving
2. Setup ya-function deploy in cli

# CLI ya
В Yandex.Cloud удобно реализовано создание функций с помощью CLI. Вам не надо архивировать код и загружать его в объектное хранилище, достаточно лишь сложить все файлы в директорию и указать на нее при создании версии функции в ключе --source-path. Так же вы можете не передавать все node_modules, а загрузить только package.json и выбрать --runtime nodejs12 или --runtime nodejs14. Все зависимости будут подтянуты в момент создания версии функции.

## Examples
https://www.youtube.com/watch?v=qV_iTlufmdE
https://github.com/telegraf/telegraf/tree/develop/docs/examples
Пример продвинутого чатбота на ЯКлауд. 
в README.md пример деплоя бота в функцию через yc cli
https://github.com/yandex-cloud/examples/tree/master/serverless/functions/chatops/nodejs
Примеры Markup (Клавиатуры)
https://github.com/telegraf/telegraf/blob/v4/docs/examples/keyboard-bot.js

# Deploy TS compiled project yandex function
1. Setup configuration in config folder
2. Set module.exports.handler in index.ts
3. Compile project using tsc command
4. Archive the project
5. Upload zip archive to yandex function
6. Copy/create package.json file to yandex function

# New Bot connect with Yandex Function
1. Create bot in BotFather. You will get bot token.
t.me/AndreyEgorovNoteBot
AndreyEgorovNoteBot
2. Call curl like this 
curl -F "url=https://functions.yandexcloud.net/<ya_fanction_id>" https://api.telegram.org/bot<bot_toket>/setWebhook
3. Don't forget to change bot token in the code of bot config.