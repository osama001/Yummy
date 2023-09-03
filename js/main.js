let row = document.getElementById('row')

let categories = document.querySelector('.categories')
let Area = document.querySelector('.Area')
let ingredients = document.querySelector('.ingredients')
let searchlink = document.querySelector('.search')
let contactlink = document.querySelector('.contact')
let regexplace1 = document.querySelector('.regexplace1')
let regexplace2 = document.querySelector('.regexplace2')
let regexplace3 = document.querySelector('.regexplace3')
let regexplace4 = document.querySelector('.regexplace4')
let regexplace5 = document.querySelector('.regexplace5')
let repasswordinp = document.querySelector('.repasswordinp')
let passwordinp = document.querySelector('.passwordinp')
function hideAside(){

    $('.inner').hide(0)
$('.inner').removeClass('d-flex')

}
hideAside()

$('.fa-bars').click(function(){
  

        $('.inner').show(1000)
        $('.inner').addClass('d-flex')

            $('.fa-x ').removeClass('d-none')
            $('.fa-x ').addClass('d-block')
           
            $(' .fa-bars ').addClass('d-none')


})
$('.fa-x ').click(function(){
  

        $('.inner').hide(1000)
        $('.inner').removeClass('d-flex')

            $('.fa-x ').addClass('d-none')
            $('.fa-x ').removeClass('d-block')
           
            $(' .fa-bars ').removeClass('d-none')

   
})

let div = document.createElement("div")



// ^fetching welcome datat 
function displaydata(data){
     cartoona = ''
    for(i=0;i<data.meals.length ;i++){

        cartoona +=`<div class="col-md-3 py-2 parent">
        <div class="countr item position-relative "  >
            <img src=${data.meals[i].strMealThumb} alt=${data.meals[i].strMeal} class="w-100 rounded-2" >
            <div class="layer position-absolute d-flex justify-content-start align-items-center rounded-2 " >
                <p class="itemName h3">${data.meals[i].strMeal}</p>
            </div>
        </div>
    </div>
    
    `
    }
     
    

    row.innerHTML= cartoona
    let eles = Array.from(document.querySelectorAll('.parent'))
    eles.forEach((ele) => {

        ele.addEventListener('click',function(e){
  
       
             let mealname =$(e.target).children('p').text()
         
           fetchMeal(mealname)

    
     
    })
    })
 
}




async function welcomeData(){
    let metaData = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    let DAta = await metaData.json()
    $('.loaderParent').css({display:'none'},1000)
    $('body').removeClass('overflow-hidden')
    displaydata(DAta)
}
function displayMeal(meal){
    box =`<div class="lightboxContainer position-fixed bg-black ">

    <div class="lightbox container py-5 ">
    <i class="fa-solid fa-xmark position-absolute end-0 text-white h1 closePop"></i>
        <div class="row">
            <div class="col-md-4">
                <div class="text-white">
                    <img src=${meal.strMealThumb} alt=${meal.strMeal} class="w-100 itemphoto"> 
                    <h2 class="text-start">${meal.strMeal}</h2>
                </div>
            </div>
            <div class="col-md-8 text-white"">
                <h2>Instructions</h2>
               <p>
               ${meal.strInstructions}
               </p>
               <ul class='list-unstyled'>
                <li>Area :               ${meal.strArea}</li>
                <li>Category  :               ${meal.strCategory}</li>
                <li class='recipes'>Recipes  :
                
                    
                 <span>      ${meal.strIngredient1}</span>
                 <span>      ${meal.strIngredient2}</span>
                 <span>      ${meal.strIngredient3}</span>
                 <span>      ${meal.strIngredient4}</span>
                 <span>      ${meal.strIngredient5}</span>
                 <span>      ${meal.strIngredient6}</span>
                 <span>      ${meal.strIngredient7}</span>
                 <span>      ${meal.strIngredient8}</span>
                 <span>      ${meal.strIngredient9}</span>
                 <span>      ${meal.strIngredient10}</span>
                 <span>      ${meal.strIngredient11}</span>
    
             
                  </li>
                    <li>
                        tags: ${meal.strTags?meal.strTags:'no tags'}
                        
                    </li>
               </ul>
               
               <a href=${meal.strSource} class="text-decoration-none text-white  border-none btn btn-success">source</a>
          <a href=${meal.strYoutube}  class="text-decoration-none text-white  btn btn-danger ">youtube</a>
            </div>
        </div>
    </div>
 </div>`
 row.innerHTML=box
 $('.closePop').click(function(){
    welcomeData()
    
})

}

welcomeData()
async function fetchMeal (meal){
   

    let mealmeta = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    let  mealdata = await mealmeta.json()
     console.log(mealdata + 'saaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
   
   displayMeal(mealdata.meals[0])
}





















// ^end of welcoming data 























// fetching list of categories
async function categoryFetch(){
    let metaData = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let  cateData = await metaData.json()

     cartoonaa = ''
    for(i=0;i<cateData.categories.length ;i++){
        cartoonaa +=`<div class="col-md-3 py-2 parent">
        <div class="item position-relative">
            <img src=${cateData.categories[i].strCategoryThumb} alt=${cateData.categories[i].strCategory} class="w-100 rounded-2">
            <div class="catelayer  position-absolute d-flex justify-content-start align-items-center rounded-2 ">
                <p class="itemName h3">${cateData.categories[i].strCategory}</p>
               
            </div>
        </div>
    </div>`
    }
    row.innerHTML= cartoonaa
   let divs = Array.from( document.querySelectorAll('.catelayer'))
    console.log(divs)
    for(i=0 ; i<divs.length;i++){
        divs[i].addEventListener('click',function(e){
          categoryname= $(e.target).children().text()
 
          categoryfilter(categoryname)
        })
    }
    

}
async function categoryfilter(term){
    let filterbycat = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${term}`)
    let  filterbycatrel = await filterbycat.json()
        
    console.log(filterbycatrel)
    displayingBycat(filterbycatrel.meals)

}
function displayingBycat(data){
    cartoonaa = ''
    for(i=0;i<data.length ;i++){
        cartoonaa +=`<div class="col-md-3 py-2 parent">
        <div class="item position-relative">
            <img src=${data[i].strMealThumb} alt=${data[i].strMeal} class="w-100 rounded-2">
            <div class="catelayer  position-absolute d-flex justify-content-center align-items-center rounded-2 ">
                <p class="itemName h3">${data[i].strMeal}</p>
               
            </div>
        </div>
    </div>`
    }
    row.innerHTML= cartoonaa

    let divsCate = Array.from(document.querySelectorAll('.catelayer'))
    console.log(divsCate)
   divsCate.forEach((ele) => {
    ele.addEventListener('click',function(e){
         mealName= $(e.target).children().text()

         fetchMeal(mealName)
  
       })
   })


    
}
categories.addEventListener('click', function(){
    $(row).removeClass('d-none')
    $('.searchPanel').addClass('d-none')
    $('.form').addClass('d-none')
    categoryFetch()
})


















 async function Areafetch (){
   
        let areaMetaData = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        let  areaData = await areaMetaData.json()
        
     cartoonaa = ''
        for(i=0;i<areaData.meals.length ;i++){
            cartoonaa +=`       <div class="col-md-3 py-5 " >
          
      <div class="parent text-white d-flex justify-content-center align-content-center flex-column">
            <i class="fa-solid fa-house py-0 h1"></i>
            <h3 class='py-0  areaName'>${areaData.meals[i].strArea}</h3>
           </div>        </div>`
        }
        row.innerHTML= cartoonaa
        let areas = Array.from(document.querySelectorAll('.parent'))
        areas.forEach(function(element){
            element.addEventListener('click',function(e){
              
                     let areaName=  $(e.target ).text()
                     console.log(areaName )
                     searcByArea(areaName)
            })
        })
}
Area.addEventListener('click',function(){
        $(row).removeClass('d-none')
$('.searchPanel').addClass('d-none')
$('.form').addClass('d-none')
    Areafetch()
})

 async function searcByArea(term){

 
        let areaMetaData = await fetch(` https://www.themealdb.com/api/json/v1/1/filter.php?a=${term} `)
        let  areaData = await areaMetaData.json()
        console.log(areaData.meals)
        displaydata(areaData)
}


































async function Ingredientsfech (){
   

    let ingredMetaData = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    let  ingredData = await ingredMetaData.json()
    
 cartoonaa = ''
    for(i=0;i<ingredData.meals.length ;i++){
        cartoonaa +=`       <div class="col-md-3 py-5 text-center parent">
      
  <div class="countr text-white d-flex justify-content-center align-content-center flex-column w-100">
  <i class="fa-solid fa-drumstick-bite h1"></i>
        <h3 class='py-0 ingredientName'>${ingredData.meals[i].strIngredient}</h3>
       </div>        </div>`
    }
    row.innerHTML= cartoonaa
    let ingredients = Array.from(document.querySelectorAll('.parent'))
    ingredients.forEach(function(element){
        element.addEventListener('click',function(e){
          
                 let ingredientName=  $(e.target ).text()
                 console.log(ingredientName )
                 searcByINgredient(ingredientName)
              
        })
    })
}
ingredients.addEventListener('click',function(){
    $(row).removeClass('d-none')
    $('.searchPanel').addClass('d-none')
    $('.form').addClass('d-none')
    Ingredientsfech()
})


async function searcByINgredient(term){

 
    let ingredientMetaData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term} `)
    let  Data = await ingredientMetaData.json()
    console.log(Data.meals)
    displaydata(Data)
}

let searchByname=document.querySelector('.sName');
let searchByFletter=document.querySelector('.fletter');

searchlink.addEventListener('click',function(){
    $('.form').addClass('d-none')
   $(row).addClass('d-none')
   $('.searchPanel').removeClass('d-none')
   $('.searchPanel').addClass('row')
   $('.searchPanel')
 
  
              
   
})
searchByname.addEventListener('input',function(e){
 let nameValue = e.target.value
 console.log(nameValue)
 if(nameValue.length > 3){

     searchingMealsName(nameValue)
 }
})


async function searchingMealsName(term){
    let MetaData = await fetch(` https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    let  searchedData = await MetaData.json()
    $(row).removeClass('d-none')
    console.log(searchedData)

}




contactlink.addEventListener('click',function(){
    $(row).addClass('d-none')
    $('.searchPanel').addClass('d-none')
    $('.form').removeClass('d-none')
})




// validation


function validateName(name) {
     let regex = /^[a-zA-Z ]{2,30}$/;


    if( regex.test(name) && name.length < 5){
        regexplace1.textContent ='your name must be more than 4 letters'
        $(regexplace1).removeClass('d-none')
       
    }else{
        $(regexplace1).addClass('d-none')
    }
}
function validateEmail(email) {
   let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/; 


    if( !regex.test(email)  ){
        regexplace2.textContent ='your have to put valid email :('
        $(regexplace2).removeClass('d-none')
       
    }else{
        $(regexplace2).addClass('d-none')
    }
}

function validatephone(num) {
    let regex = /^[0-9]{11}$/;


   if( regex.test(num) ){
       regexplace3.textContent ='your number must be more 11 numbers'
       $(regexplace3).removeClass('d-none')
      
   }else{
       $(regexplace3).addClass('d-none')
   }
}


function checkpass(value){
    let regex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;


    if( !regex.test(value) ){
        regexplace4.textContent ='your pass is not valid put Charecters and num and letters'
        $(regexplace4).removeClass('d-none')
       
    }else{
        $(regexplace3).addClass('d-none')
        $('.submit').removeClass('disabled')
       
    }
}

function checkduplication(value){
   


    if( passwordinp.value !== repasswordinp.value ){
        regexplace5.textContent ='you must write same password'
        $(regexplace5).removeClass('d-none')
       
    }else{
        $(regexplace5).addClass('d-none')
    
    }
}

