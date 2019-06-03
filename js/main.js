currentCategory = null;
currentSubCategory = null;
currentManufacturer = null;
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

function getParts(category=null, sub_category=null, manufacturer=null, limit=40, offset=0){
  req_string = "/api/parts.php";

  req_string += "?"
  reqArray = []

  if (category || manufacturer || sub_category)
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
  currentPage = 0;
  updatePage();
}

function clickSubCategory(){
  currentSubCategory = $(this).attr('subcategory');
  currentManufacturer = null;
  currentPage = 0;
  updatePage();
}

function clickManufacturer(){
  currentManufacturer = $(this).attr('manufacturer');
  currentPage = 0;
  updatePage();
}

function imageError(something){
  $(this).unbind("error");
  $(this).attr("src", "/img/missing.jpg");
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
  newList = $("<ul>");
  categories = getCategories();
  categories.forEach(function(element){
    newListItem = $("<li>");
    newListButton = $("<button>");
    newListButton.html(element);
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
      newListButton.html(element);
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
      newListButton.html(element);
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

  response = getParts(currentCategory, currentSubCategory, currentManufacturer, resultsPerPage, currentPage * resultsPerPage);
  totalResults = parseInt(response["totalResults"]);
  parts = response["data"]

    parts.forEach(function(element)
    {
      console.log(currentPage);
      catalogueCard = $("<div/>");
      catalogueCard.attr("class", "catalogue-card aos-init aos-animate");
      catalogueCard.attr('data-aos', 'fade-up');

      catalogueCardDescription = $("<div/>");
      catalogueCardDescription.attr("class", "catalogue-card-description");
      catalogueCardDescription.text(element[1]);
      catalogueCard.append(catalogueCardDescription);

      catalogueCardInner = $("<div/>");
      catalogueCardInner.attr("class", "catalogue-card-inner");
      catalogueCardInner.append("<br><br>");

      mainImageAnchor = $("<a/>");
      mainImageAnchor.attr("id", "image-link");
      mainImageAnchor.attr("href", `/img/${element[0]} A.jpeg`);
      mainImageAnchor.attr("data-fancybox", "gallery");

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

      catalogueCardInner.append("<br><br>")
      partDiv = $("<div>");
      partDiv.attr("class","part-number");
      partDiv.text(`#${element[0]}`);
      catalogueCardInner.append(partDiv);

      catalogueCardInner.append("<br><br>");
      catalogueCard.append(catalogueCardInner);

      catalogueWrapper.append(catalogueCard);
    });

    
}

function updatePagination()
{
  paginationDiv = $("#pagination-wrapper");
  paginationDiv.html("");

  if (totalResults == null) getParts(currentCategory, currentSubCategory, currentManufacturer, resultsPerPage, currentPage * resultsPerPage);

  pageCount = totalResults / resultsPerPage;

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
