currentCategory = null;
currentSubCategory = null;
currentManufacturer = null;
currentSearchWord = null;
resultsPerPage = 40;
currentPage = 0;
totalResults = null;

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
  returnData = $.parseJSON($.ajax({
    url: req_string,
    async: false
  }).responseText);

  return returnData
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
    "VALVE": "VALVES",
    "LIGHT": "LIGHTING",
    "ELECTRIC": "ELECTRICAL",
    "HOSEBAY": "HOSES",
    "BOLT": "BOLTS"
  };

  $subCategoryMap = {
    "REFLECT": "REFLECTOR",
    "TEMPERAT": "TEMPERATURE",
    "REPAIRKI": "REPAIR KIT",
    "EMERGENCY": "EMERGENCY",
    "FIBERGLA": "FIBER GLASS",
    "INCANDES": "INCANDESCANT",
    "ALLTHRD": "ALL THREAD"
  };

  $manufacturerMap = {
    "ARCTICFL": "ARCTICFLEX",
    "SPEEDDEM": "SPEED DEMON",
    "TRUCKLIT": "TRUCKLITE",
    "REELCRAFT": "REELCRAFT",
    "HENDRICK": "HENDRICKSON",
    "GORMAN R": "GORMAN RUPP",
    "ALLEGHEN": "ALLEGHENY",
    "PHILLIPS": "PHILIPS"
  };

  newList = $("<ul>");
  categories = getCategories();
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
      header.css("display", "block");
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

    header.css("display", "block");
    newList = $("<ul>");
    manufacturers = getManufacturers(currentCategory, currentSubCategory);

    manufacturers = manufacturers.filter(function(element){
      return element != "";
    });

    if (manufacturers.length > 0)
    {
      header.css("display", "block");
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

function updateBody()
{
  catalogueWrapper = $("#catalogue-wrapper");
  catalogueWrapper.text("");

  response = getParts(currentCategory, currentSubCategory, currentManufacturer, currentSearchWord, resultsPerPage, currentPage * resultsPerPage);
  totalResults = parseInt(response["totalResults"]);
  parts = response["data"]

    parts.forEach(function(element)
    {
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
      mainImageAnchor.attr("href", `/img/${element[0]} A.jpeg`);
      mainImageAnchor.attr("data-fancybox", "");
      // mainImageAnchor.attr("data-options", '{"smallBtn" : auto, "arrows" : false}');

      mainImageImage = $("<img/>");
      mainImageImage.attr("id", "full-image");
      mainImageImage.attr("src", `/img/${element[0]} A.jpeg`);
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
        lilImage.attr("src", `/img/${element[0]} ${letter}.jpeg`);
        lilImage.on("error", imageError);
        lilImage.on("click", thumbClick)
        catalogueCardInner.append(lilImage);
      });

      
      catalogueCard.append(catalogueCardInner);

      catalogueWrapper.append(catalogueCard);
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
  updatePage();
}));
