currentCategory = null;
currentSubCategory = null;
currentManufacturer = null;
currentSearchWord = null;
resultsPerPage = 40;
currentPage = 0;
totalResults = null;
cartData = [];
arrObj = [];
cartPartNumber = null;
cartDescription = null;

function getCategories(sub_category=null, manufacturer=null){
  req_string = "/api/category.php";

 

  if (manufacturer || sub_category)
  {
    req_string += "?"
    reqArray = []

    if(manufacturer)
    {
      reqArray.push(`manufacturer="${manufacturer}"`);
    }

    if(sub_category)
    {
      reqArray.push(`sub_category="${sub_category}"`);
    }

    req_string += reqArray.join("&");
  }

  returnData = []
  // returnData = $.parseJSON($.ajax({
  //   url: req_string,
  //   async: false
  // }).responseText);

  rawData = $.ajax({
    url: req_string,
    async: false
  }).responseText

console.log(rawData);

returnData = $.parseJSON(rawData);

  return returnData;
}

function getManufacturers(category=null, sub_category=null){
  req_string = "/api/manufacturer.php";

  if (category || sub_category)
  {
    req_string += "?"
    reqArray = []
    if(category)
    {
      reqArray.push(`category="${category}"`);
    }

    if(sub_category)
    {
      reqArray.push(`sub_category="${sub_category}"`);
    }

    req_string += reqArray.join("&");
  }

  returnData = []
  returnData = $.parseJSON($.ajax({
    url: req_string,
    async: false
  }).responseText);

  return returnData
}

function getSubCategories(category=null, manufacturer=null){
  req_string = "/api/sub_category.php";

  if (category || manufacturer)
  {
    req_string += "?"
    reqArray = []
    if(category)
    {
      reqArray.push(`category="${category}"`);
    }

    if(manufacturer)
    {
      reqArray.push(`manufacturer="${manufacturer}"`);
    }

    req_string += reqArray.join("&");
  }
  returnData = []
  returnData = $.parseJSON($.ajax({
    url: req_string,
    async: false
  }).responseText);

  return returnData
}

function getParts(category=null, sub_category=null, manufacturer=null, search_word=null, limit=40, offset=0){
  req_string = "/api/parts.php";

  req_string += "?"
  reqArray = []

  if (category || manufacturer || sub_category || search_word)
  {
    if(category)
    {
      reqArray.push(`category="${category}"`);
    }

    if(manufacturer)
    {
      reqArray.push(`manufacturer="${manufacturer}"`);
    }

    if(sub_category)
    {
      reqArray.push(`sub_category="${sub_category}"`);
    }

    if(search_word)
    {
      reqArray.push(`search_word="${search_word}"`);
    }
  }

  reqArray.push(`limit=${limit}`);
  reqArray.push(`offset=${offset}`);

  req_string += reqArray.join("&");

  returnData = []
  returnData = $.parseJSON($.ajax({
    url: req_string,
    async: false
  }).responseText);

  return returnData
}

function clickCategory(){
  currentCategory = $(this).attr('category');
  currentSubCategory = null;
  currentManufacturer = null;
  currentSearchWord = null;
  currentPage = 0;
  updatePage();
}

function clickSubCategory(){
  currentSubCategory = $(this).attr('subcategory');
  currentManufacturer = null;
  currentSearchWord = null;
  currentPage = 0;
  updatePage();
}

function clickManufacturer(){
  currentManufacturer = $(this).attr('manufacturer');
  currentSearchWord = null;
  currentPage = 0;
  updatePage();
}

// This is the function to take the search value.
$(document).ready(function() {
  $(".search_button").click(function(event){
     event.preventDefault();
     var search_word = $('#searchValue').val();
     console.log(search_word);
     currentSearchWord = search_word;
     currentCategory = null;
     currentSubCategory = null;
     currentManufacturer = null;
     console.log(currentSearchWord);
     currentPage = 0;
     updatePage();
  });
});

function imageError(something){
  $(this).unbind("error");
  $(this).attr("src", "/img/missing.jpg");
  // $(this).removeClass("thumb");
}

function updateHeader(){
  //erase the olde

  header = $("#manufacturer-header")
  header.text("");
  header.css("display", "none")
  header = $("#sub-category-header")
  header.text("");
  header.css("display", "none")


  header = $("#category-header");
  header.text("")

  //Make the categories

  //First is a library for bin_description_2, 3, and 4. Abbreviated variables taken from the database followed by the unnabreviated
  //form as it should be displayed on the frontend.
  $categoryMap = {
    "ALARM": "ALARMS",
    "LIGHT": "LIGHTING",
    "ELECTRIC": "ELECTRICAL",
    "HOSEBAY": "HOSES",
    "BOLT": "BOLTS",
    "IDENTIFI": "IDENTIFICATION",
    "BRAKE/SU": "BRAKE/SUSPENSION"
  };

  $subCategoryMap = {
    "REFLECT": "REFLECTOR",
    "TEMPERAT": "TEMPERATURE",
    "REPAIRKI": "REPAIR KIT",
    "EMERGENC": "EMERGENCY",
    "FIBERGLA": "FIBER GLASS",
    "CHEM/HYD": "CHEMICAL/HYDRAULIC",
    "INCANDES": "INCANDESCENT",
    "ALLTHRD": "ALL THREAD",
    "HYDRAULI": "HYDRAULIC",
    "SIGHTGLA": "SIGHT GLASS",
    "STAINLES": "STAINLESS STEEL",
    "COMPOSIT": "COMPOSITE",
    "SUSPENSI": "SUSPENSION",
    "PRESS/VA": "PRESS/VAC",
    "SUPERSTO": "SUPERSTOP",
    "THERMOME": "THERMOMETER"

    
  };

  $manufacturerMap = {
    "ARCTICFL": "ARCTICFLEX",
    "SPEEDDEM": "SPEED DEMON",
    "TRUCKLIT": "TRUCKLITE",
    "REELCRAF": "REELCRAFT",
    "HENDRICK": "HENDRICKSON",
    "GORMAN R": "GORMAN RUPP",
    "ALLEGHEN": "ALLEGHENY",
    "PHILLIPS": "PHILIPS",
    "BERTOLIN": "BERTOLINI",
    "ROCHESTE": "ROCHESTER",
    "VICTAULI": "VICTAULIC",
    "COLEHERS": "COLE HERSEE",
    "HONEYWEL": "HONEY WELL",
    "CHALLENG": "CHALLENGER",
    "SUPERTO": "SUPERSTOP"
  };

  newList = $("<ul>");
  categories = getCategories();

  console.log(categories);
  categories.forEach(function(element){
    newListItem = $("<li>");
    newListButton = $("<button>");

    if ($categoryMap[element] = $categoryMap[element]) {
    newListButton.html($categoryMap[element]);
    } else {
      newListButton.html(element);
    };

    console.log(element);
    newListButton.attr('category', element);
    newListButton.on("click", clickCategory);
    newListItem.append(newListButton);
    newList.append(newListItem);
  });

  header.append(newList);

  if (currentCategory != null)
  {
    header = $("#sub-category-header")
    header.text("");

    newList = $("<ul>");
    subCategories = getSubCategories(currentCategory);

    subCategories = subCategories.filter(function(element){
      return element != "";
    });

    if(subCategories.length > 0)
    {
      header.css("display", "flex");
      // header.css("flex-wrap", "wrap");
    }
    // console.log(subCategories);


    subCategories.forEach(function(element){
      newListItem = $("<li>");
      newListButton = $("<button>");

      //THIS IS WHERE TO PUT THE FILTER FOR CATEGORY MAP

      //Only the internal text for the DOM item needs to change. So for category:

      //newListButton.html(element);
      //newListButton.attr('category', element);

      //Only change the .html part

      if ($subCategoryMap[element] = $subCategoryMap[element]) {
        newListButton.html($subCategoryMap[element]);
        } else {
          newListButton.html(element);
        };

      newListButton.attr('subcategory', element);
      newListButton.on("click",clickSubCategory);
      newListItem.append(newListButton);
      newList.append(newListItem);
    });

    header.append(newList);
  }

  if (currentSubCategory != null)
  {
    header = $("#manufacturer-header")
    header.text("");

    header.css("display", "flex");
    // header.css("flex-wrap", "wrap");
    newList = $("<ul>");
    manufacturers = getManufacturers(currentCategory, currentSubCategory);

    manufacturers = manufacturers.filter(function(element){
      return element != "";
    });

    if (manufacturers.length > 0)
    {
      header.css("display", "flex");
      // header.css("flex-wrap", "wrap");
    }

    manufacturers.forEach(function(element){
      newListItem = $("<li>");
      newListButton = $("<button>");
        if (element in $manufacturerMap) {
      newListButton.html($manufacturerMap[element]);
      } else {
        newListButton.html(element);
      };
      newListButton.attr('manufacturer', element);
      newListButton.on("click", clickManufacturer);
      newListItem.append(newListButton);
      newList.append(newListItem);
    });

    header.append(newList);
  }
}

function updateCart() {
  let cart = document.getElementById("cart");
  cart = $("#cart");
  cart.text("");
  arrObj.forEach(function(element) {
    

    cartItem = $("<div/>");
    cartItem.attr("id", "cartItem");

    sectionCartPart = $("<div/>");
    sectionCartPart.attr("id", "section-cartPart");

    sectionCartQuantity = $("<div/>");
    sectionCartQuantity.attr("id", "section-cartQuantity");
    
    cartPartNumber = $("<div/>");
    cartPartNumber.attr("class", "cartPartNumber");
    cartPartNumber.text(element.part);

    cartItemDescription = $("<div/>");
    cartItemDescription.attr("class", "cartItemDescription");
    cartItemDescription.text(element.description);

    cartItemQuantity = $("<div/>");
    cartItemQuantity.attr("class", "cartItemQuantity");
    cartItemQuantity.text(element.quantity);

    cartButtonUp = $("<button/>");
    cartButtonUp.attr("id", "cartButtonAdd");
    cartButtonUp.attr("data", element.part);
    cartButtonUp.on("click", cartButtonAdd);
    cartButtonUp.text("+");

    cartButtonDown= $("<button/>");
    cartButtonDown.attr("id", "cartButtonRemove");
    cartButtonDown.attr("data", element.part);
    cartButtonDown.on("click", cartButtonRemove);
    cartButtonDown.text("-");

    cartItemDelete = $("<button/>");
    cartItemDelete.attr("data", element.part);
    cartItemDelete.on("click", cartButtonDelete)
    cartItemDelete.attr("id", "cartItemDelete");
    cartItemDelete.text("Delete");

    cartSubmitButton = $("<button/>");
    cartSubmitButton.on("click", submitOrderButton);
    cartSubmitButton.text("Complete Order");

    sectionCartPart.append(cartPartNumber);
    sectionCartPart.append(cartItemDescription);

    sectionCartQuantity.append(cartButtonDown);
    sectionCartQuantity.append(cartItemQuantity);
    sectionCartQuantity.append(cartButtonUp);
  
    
    cartItem.append(sectionCartPart);
    cartItem.append(sectionCartQuantity);
    cartItem.append(cartItemDelete);
    cart.append(cartItem);
    
  
      
    });
   
    cart.append(cartSubmitButton);
}

$(function() {

	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
    // Stop the browser from submitting the form.
    
    e.preventDefault();
    // e.stopImmediatePropagation();

    // Serialize the form data.
    let user_form_data = $(form).serialize();
    let data_modifier = "&data="
    let user_part_data = encodeURIComponent(JSON.stringify(arrObj));
    let all_form_data = user_form_data + data_modifier + user_part_data;

    var formData = all_form_data;
    

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).removeClass('error');
			$(formMessages).addClass('success');

			// Set the message text.
			$(formMessages).text(response);

			// Clear the form.
			$('#name, #email, #message').val('');
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).removeClass('success');
			$(formMessages).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
      }
      
      console.log(data.responseText);
      console.log(all_form_data);
      console.log($(form).serialize());
      console.log($(form));
      console.log(encodeURIComponent(JSON.stringify(arrObj)))
		});

  });

});





// Submit the form using AJAX.


function submitButton(something) {
  window.scroll(0,0);
  cartData = ($(this).attr("data").split(','));

let cartObj = {
  part: cartData[0],
  description: cartData[1],
  quantity: 1
}
match = false;
arrObj.forEach(function(cartObject){
  if (cartObject.part == cartData[0])
  {
       match = true;
       cartObject.quantity++
  }
})
if (!match) arrObj.push(cartObj);
console.log(arrObj);

  let cart = document.getElementById("cart");


  document.getElementById("cart").style.display = "flex";

  cart = $("#cart");
  cart.text("");
  updateCart();
  
  console.log(arrObj);
}

function cartButtonAdd() {
  for (var i = 0; i < arrObj.length; i++){
    if (arrObj[i].part == $(this).attr("data"))
    {
         match = true;
         arrObj[i].quantity++
    } else if (arrObj[i].part == 0) {
      arrObj[i].part == 1;
    }
    console.log(arrObj);
  }

  updateCart();
  
}


function cartButtonRemove() {
  for (var i = 0; i < arrObj.length; i++) {
    if (arrObj[i].part == $(this).attr("data"))
    {
      match = true;
      if (arrObj[i].quantity > 1) {
      arrObj[i].quantity--
      }
    }

  }
  updateCart();
}

function cartButtonDelete() {
 for (var i = 0; i < arrObj.length; i++) {
    if (arrObj[i].part == $(this).attr("data"))
    {
      match = true;
      arrObj.splice(i, 1);
      }

    }
    if (arrObj.length === 0) {
      console.log("SUCCESS");
      document.getElementById("cart").style.display = "none";
      document.getElementById("checkout").style.display = "none";
    }
    updateCart();
  }

function submitOrderButton() {
  let checkout = document.getElementById("checkout")

  document.getElementById("checkout").style.display = "flex";
}

function updateBody()
{
  
  outerWrapper = $("#outer-wrapper");
  outerWrapper.text("");
  catalogueWrapper = $("#catalogue-wrapper");
  catalogueWrapper.text("");

  response = getParts(currentCategory, currentSubCategory, currentManufacturer, currentSearchWord, resultsPerPage, currentPage * resultsPerPage);
  totalResults = parseInt(response["totalResults"]);
  parts = response["data"]

    parts.forEach(function(element)
    {
      var cleanstring = element[0].replace(/\/|\./g, "");
      console.log(currentPage);
      catalogueCard = $("<div/>");
      catalogueCard.attr("class", "catalogue-card aos-init aos-animate");
      catalogueCard.attr('data-aos', 'fade-up');

      
      partDiv = $("<div>");
      partDiv.attr("class","part-number");
      partDiv.text(`${element[0]}`);
      catalogueCard.append(partDiv);

    

      catalogueCardDescription = $("<div/>");
      catalogueCardDescription.attr("class", "catalogue-card-description");
      catalogueCardDescription.text(element[1]);
      catalogueCard.append(catalogueCardDescription);
      // fancyCloseBtn = $("<button/>");
      // fancyCloseBtn.attr("data-fancybox-close", "");
      // fancyCloseBtn.attr("class", "fancybox-button--close");

      catalogueCardInner = $("<div/>");
      catalogueCardInner.attr("class", "catalogue-card-inner");
      catalogueCardInner.append("<br><br>");

      mainImageAnchor = $("<a/>");
      mainImageAnchor.attr("id", "image-link");
      mainImageAnchor.attr("href", `/img/${cleanstring} A.jpeg`);
      mainImageAnchor.attr("data-fancybox", "");
      // mainImageAnchor.attr("data-options", '{"smallBtn" : auto, "arrows" : false}');

      mainImageImage = $("<img/>");
      mainImageImage.attr("id", "full-image");
      mainImageImage.attr("src", `/img/${cleanstring} A.jpeg`);
      mainImageImage.attr("class", "full");
      
      mainImageImage.css("height", "200px");
      mainImageImage.on("error", imageError);
      mainImageAnchor.append(mainImageImage);
      catalogueCardInner.append(mainImageAnchor);
      catalogueCardInner.append("<br><br>");

      


      letters = ['A', 'B', 'C', 'D'];
      letters.forEach(function(letter){
        lilImage = $("<img>");
        lilImage.attr("class", "thumb");
        lilImage.css("height", "50px");
        lilImage.attr("src", `/img/${cleanstring} ${letter}.jpeg`);
        lilImage.on("error", imageError);
        lilImage.on("click", thumbClick)
        catalogueCardInner.append(lilImage);
      });

      cartButton = $("<div/>");
      cartButton.attr("class", "cartButton");
      // cartButton.attr("data", JSON.stringify(element));
      cartButton.attr("data", element);
      cartButton.on("click", submitButton )
      cartButton.text("Add to cart");
      catalogueCardInner.append(cartButton);

      
      catalogueCard.append(catalogueCardInner);
      
      catalogueWrapper.append(catalogueCard);
      outerWrapper.append("");
    });

    
}

function updatePagination()
{
  paginationDiv = $("#pagination-wrapper");
  paginationDiv.html("");

  if (totalResults == null) getParts(currentCategory, currentSubCategory, currentManufacturer, currentSearchWord, resultsPerPage, currentPage * resultsPerPage);

  pageCount = Math.ceil(totalResults / resultsPerPage);

  if (currentPage > 0)
  {
    previousButton = $("<div>");
    previousButton.attr("class", "pagination");

    previousButtonLink = $("<a>");
    previousButtonLink.on("click", pageClick);
    previousButtonLink.attr("href", "#");
    previousButtonLink.attr("page", currentPage-1);
    previousButtonLink.text("<");
    previousButton.append(previousButtonLink);
    paginationDiv.append(previousButton);
  }

  startValue = currentPage;
  if (currentPage + 11 > pageCount) startValue = pageCount - 11;
  else startValue = currentPage - 5;
  if (startValue < 0) startValue = 0;

  for (var i = startValue; (i < pageCount && i < startValue + 11); i++)
  {
    pagination = $("<div>");
    pagination.attr("class", "pagination");

    if (currentPage == i)
    {
      newPageLink = $("<span>");
      newPageLink.text(i+1);
      pagination.css("color", "white");
      pagination.css("background-color", "black");
      pagination.append(newPageLink);
    }
    else {
      newPageLink = $("<a>");
      newPageLink.on("click", pageClick);
      newPageLink.attr("href", "#");
      newPageLink.attr("page", i);
      newPageLink.text(i+1);
      pagination.append(newPageLink);
    }

    paginationDiv.append(pagination);
  }

  if (currentPage < pageCount - 1)
  {
    previousButton = $("<div>");
    previousButton.attr("class", "pagination");

    previousButtonLink = $("<a>");
    previousButtonLink.on("click", pageClick);
    previousButtonLink.attr("href", "#");
    previousButtonLink.attr("page", currentPage+1);
    previousButtonLink.text(">");
    previousButton.append(previousButtonLink);
    paginationDiv.append(previousButton);
  }
}

function thumbClick () {
  var full = $(this).parent('.catalogue-card-inner').find('img.full');
  full.attr('src', $(this).attr('src'));
  $(this).parent('.catalogue-card-inner').find('#image-link').attr('href', full.attr('src'));
}

function pageClick()
{
  currentPage = parseInt($(this).attr("page"));
  updatePage();
}


$('img.thumb').on("click", thumbClick);

function updatePage()
{
  updateHeader();
  updateBody();
  updatePagination();
}



$((function(){
  //can use JS to get the things.
  updateHeader();
  updateBodyPagination();
  cart();
  // updatePage();
}));
