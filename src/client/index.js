// imports statements from app.js //
import {performAction} from './js/app.js'
//debugging //
console.log(performAction);

// require the files in index.js to import my scss files
import './styles/style.scss'
import './styles/header.scss'
import './styles/index.scss'
import './styles/image.scss'

//exporting my JS function
export {performAction}

alert("I exist!");