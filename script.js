

//Input Password 
const inputPaswordValue = document.getElementById('password-form-input')


//Copy Icon and copy Text 
const copyIconLinkEl =  document.querySelector('.copy-icon-link');
const copyContentEl = document.querySelector('.copied');

const copiedTextEl = document.querySelector('.copy-text');

//Initially hiding the copied text
copiedTextEl.style.visibility = "hidden";


// checkboxes
const lowerCaseCheck = document.getElementById('lowercase');
const upperCaseCheck =document.getElementById('uppercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');



// Range Slider
const slider =  document.getElementById('myRange');
const sliderNumber = document.querySelector('.character-number');




//Strength section and strength bar 
const strengthNameEl = document.querySelector('.strength-name')

const barOneEl =  document.querySelector('.bar-one');
const barTwoEl = document.querySelector('.bar-two');
const barThreeEl = document.querySelector('.bar-three');
const barFourEl = document.querySelector('.bar-four');


//Button Generate
const btnGenerate =  document.querySelector('.btn-generate');
const arrowIconEl =  document.querySelector('.arrow');

let password="";
let passwordLength = 0;
let copyContentBool = false;  // Keep track visibility of copied text.


// Array of  objects
/*
 {
   type of character.
   array of character.
   regex pattern : checks if aleast one character matches.
   regex pattern: must have character.
 }

*/
const PatternArray = [
    {
        title: 'lowercase',
        array:  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        contain :'(?=.*[a-z])',
        only_contains : 'a-z',
        checked :false
     
     },
     {
        title: 'uppercase',
        array : [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' ],
        contain: '(?=.*[A-Z])',
        only_contains:'A-Z',
        checked: false
    },
    { 
        title: 'numbers',
        array: [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        contain: '(?=.*\\d)',
        only_contains : '\\d',
        checked: false
    },
    {
        title:'symbols',
        array : [ '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '=', '+', '[', ']', '{', '}', '\\', '|', ';', ':', "'", '"', ',', '.', '/', '<', '>', '?', '~', '`','_'],
        contain : "(?=.*[!@#$%^&*()_\\-+={}[\]|\\:;\"'<>,.?\/~`])",
        only_contains: "!@#$%^&*()_\\-+={}[\]|\\:;\"'<>,.?\/~`",
        checked: false
    }
    

];




//Generating Password
function generatePassword(passLength,charArray) {
        
        console.log()
        let charIndex;
        password='';
        for(let i=0;i<passLength;i++){
             charIndex = Math.floor(Math.random()*charArray.length);
                  password += charArray[charIndex];
        }
        console.log(password);   
        return password;

}

//Checking the generated password using regex pattern.
const PatternCheck = function(passLength,charArray,regexPattern)
{

   let patternTest = false;

   while(!patternTest)
   {  
    password = generatePassword(passLength,charArray)
    patternTest=regexPattern.test(password)    
    console.log(patternTest)
   }
   return password;

}


// color change as the slider changes
const sliderColor = function(){
    const progress = (passwordLength / slider.max) * 100;
    console.log(progress)
   slider.style.background = `linear-gradient(to right, #A4FFAF ${progress}%, #18171F  ${progress}%)`;
}




// Visibility of copied text.
const copiedVisibility =  function(){
    if(copyContentBool){
        copiedTextEl.style.visibility ='hidden'
        copyContentBool = false;
    }
    else {
        copiedTextEl.style.visibility = 'visible'
        copyContentBool = true;
    }
}


//Evaluating the strength of the password.
const strength = function(count){

    barOneEl.style.backgroundColor = ''
    barTwoEl.style.backgroundColor = ''
    barThreeEl.style.backgroundColor = ''
    barFourEl.style.backgroundColor = ''

    if(count==1 || passwordLength>1) {
        strengthNameEl.innerText = "TOO WEAK!"
        barOneEl.style.backgroundColor = '#F64A4A'
    } 

    if((count==2) &&( passwordLength > 5)){
         strengthNameEl.innerText = 'WEAK'
         barOneEl.style.backgroundColor = '#F64A4A'
         barTwoEl.style.backgroundColor = '#F64A4A'
    }


    if((count== 3) && (passwordLength >= 8)){
        strengthNameEl.innerText = 'MEDIUM'
        barOneEl.style.backgroundColor = '#A4FFAF'
        barTwoEl.style.backgroundColor = '#A4FFAF'
        barThreeEl.style.backgroundColor = '#A4FFAF'
     

   }

   if((count=== 4) && (passwordLength >= 8)){
         strengthNameEl.innerText = 'STRONG'
         barOneEl.style.backgroundColor = '#F8CD65'
         barTwoEl.style.backgroundColor = '#F8CD65'
         barThreeEl.style.backgroundColor = '#F8CD65'
         barFourEl.style.backgroundColor = '#F8CD65'
    }
}



// Writing a password to the clipboard.
async function writeClipBoardText(){
    try { 
        navigator.clipboard.writeText(password)
    }
        catch (err){
   console.log(err)
        }
}


// Copy icon click visibility.
copyIconLinkEl.addEventListener('click',()=>{
   copiedVisibility();
   writeClipBoardText()
})



//Event for slider
slider.addEventListener('input',(event)=>{
   passwordLength = event.target.value;
   sliderNumber.innerText = `${event.target.value}` 
   sliderColor();
   
    if(copyContentBool){
        copiedVisibility()
    }
})



//Check boxes.
lowerCaseCheck.addEventListener('change',(event)=>{
    PatternArray[0].checked = event.target.checked;
    // console.log('lowercase')
    console.log(PatternArray[0].checked);


    if(copyContentBool){
        copiedVisibility()
    }   
})


upperCaseCheck.addEventListener('change',(event)=>{

    PatternArray[1].checked = event.target.checked;
    // console.log('uppercase')
    console.log(PatternArray[1].checked);

    if(copyContentBool){
        copiedVisibility()
    }
})


numbersCheck.addEventListener('change',(event)=>{
    PatternArray[2].checked = event.target.checked;
    // console.log('numbers')
    console.log(PatternArray[2].checked);


    if(copyContentBool){
        copiedVisibility()
    }
   
})

symbolsCheck.addEventListener('change',(event)=>{
    PatternArray[3].checked = event.target.checked;
    // console.log('symbolsChecks')
    console.log(PatternArray[3].checked);


    if(copyContentBool){
        copiedVisibility()
    }
})


//Event for button generate.
btnGenerate.addEventListener('mouseover',()=>{

    btnGenerate.style.backgroundColor = '#24232C';
    btnGenerate.style.border = '1px solid #A4FFAF';
    btnGenerate.style.color = '#A4FFAF';

    arrowIconEl.style.filter = 'brightness(0) saturate(100%) invert(82%) sepia(34%) saturate(428%) hue-rotate(71deg) brightness(106%) contrast(101%);'
    

})

btnGenerate.addEventListener('mouseover',()=>{

    btnGenerate.style.backgroundColor = '#24232C';
    btnGenerate.style.border = '1px solid #A4FFAF';
    btnGenerate.style.color = '#A4FFAF';

    arrowIconEl.style.filter = 'brightness(0) saturate(100%) invert(82%) sepia(34%) saturate(428%) hue-rotate(71deg) brightness(106%) contrast(101%);'

})

btnGenerate.addEventListener('mouseout',()=>{

    btnGenerate.style.backgroundColor = '#A4FFAF';
    btnGenerate.style.border = '0';
    btnGenerate.style.color = '#18171F';

    arrowIconEl.style.filter = 'brightness(0) saturate(100%) invert(82%) sepia(34%) saturate(428%) hue-rotate(71deg) brightness(106%) contrast(101%)'

})



//Generate Button.
btnGenerate.addEventListener('click',()=>{
      
    let aleastString = "";
    let onlyContains = "";
    let regexPattern = "";
    let UserCharArray = [];
    let count = 0;
    for( let i in PatternArray){
        
        if(PatternArray[i].checked){
            count += 1;
            aleastString += PatternArray[i].contain
            onlyContains += PatternArray[i].only_contains
            UserCharArray = UserCharArray.concat(PatternArray[i].array)
        }
    }
   
    if(copyContentBool){
        copiedVisibility()
    }

    strength(count);

    regexPattern = new RegExp(`^${aleastString}[${onlyContains}]+$`);
    if(count>0 && passwordLength > 0 && passwordLength>=count)
    {  
        
        password=PatternCheck(passwordLength,UserCharArray,regexPattern)
        inputPaswordValue.value =  password
        inputPaswordValue.style.color = '#E6E5EA'
    }


});