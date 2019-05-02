<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

   

    <title>Document</title>
    <script src="./jquery-3.3.1.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    <script>
    
    $(document).ready(function(){
        var trigger = $('a'),
        container = $('#content');

    trigger.on('click', function(){
        var $this = $(this),
            target = $this.data('target');

    container.load(target + '.php');

    return false;
    });
});

    </script>
</head>
<body>

    <a href="#" data-target="test1">Test1</a>
    <a href="#" data-target="test2">Test2</a>
    <div id="content">
    
        <?php include('test1.php')?>

    </div>

    
</body>
</html>