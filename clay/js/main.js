category = null;
sub_category = null;
manufacturer = null;

function getCategories(sub_category=null, manufacturer=null){
  req_string = "/api/category.php";

  if (sub_category || manufacturer)
  {
    req_string += "?"
    if(sub_category)
    {
      req_string += `sub_category="${sub_category}"`
    }

    if(manufacturer)
    {
      req_string += `manufacturer="${manufacturer}"`
    }
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
    if(category)
    {
      req_string += `category="${category}"`
    }

    if(sub_category)
    {
      req_string += `sub_category="${sub_category}"`
    }
  }

  returnData = []
  returnData = $.ajax({
    url: req_string,
    async: false
  }).responseText;

  return returnData
}

function getSubCategories(category=null, manufacturer=null){
  req_string = "/api/sub_category.php";

  if (category || manufacturer)
  {
    req_string += "?"
    if(category)
    {
      req_string += `category="${category}"`
    }

    if(manufacturer)
    {
      req_string += `manufacturer="${manufacturer}"`
    }
  }
  returnData = []
  returnData = $.parseJSON($.ajax({
    url: req_string,
    async: false
  }).responseText);

  return returnData
}

function getParts(category=null, sub_category=null, manufacturer=null){
  req_string = "/api/parts.php";

  if (category || manufacturer || sub_category)
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

function updateHeader(category=null, sub_category=null, manufacturer=null){
  header = $("#sub-header");

  //Make the categories
  newList = $("<ul>");
  categories = getCategories(sub_category, manufacturer);
  console.log(categories);
  categories.forEach(function(element){
    newListItem = $("<li>");
    newListButton = $("<button>");
    newListButton.html(element);
    newListButton.attr('category', element);
    newListItem.append(newListButton);
    newList.append(newListItem);
  });

  header.append(newList);
}

$((function(){
  //can use JS to get the things.
  updateHeader();
}));
