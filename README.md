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