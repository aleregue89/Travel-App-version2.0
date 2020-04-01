// imports statements from app.js //
import {performAction} from './js/app.js';
import {removeTripHandler} from './js/app.js';
import {checkForName} from './js/nameValidation';

//debugging //
console.log(performAction);

// require the files in index.js to import my scss files
import './styles/style.scss';
import './styles/header.scss';
import './styles/index.scss';
import './styles/image.scss';

//exporting my JS function
export {
    performAction,
    removeTripHandler,
    checkForName
};

