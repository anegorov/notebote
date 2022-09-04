# Installation

Install nodejs
sudo npm i -g typescript
tsc --init (This command creates tsconfig.json file. Set src and dist folders in tsconfig.json file.)
npm install telegraf
Get bot token and it works
npm install axios (library for http requests)

# Commands
### To add new note
1. $n {note name} -b {body}

### To edit existing note
1. $e {note name}

### To get list of existing notes
1. ls - returns all resources (files and folders) 
2. ls {path name} - returns resources in specified folder

### Delete note/file
1. del - delete specified file (example: del default/file_note.json
)