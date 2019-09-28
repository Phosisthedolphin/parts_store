<?php

// Import PHPMailer classes into the global namespace
// These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// If necessary, modify the path in the require statement below to refer to the
// location of your Composer autoload.php file.
require '../vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the form fields and remove whitespace.
    $name = strip_tags(trim($_POST["name"]));
            $name = str_replace(array("\r","\n"),array(" "," "),$name);
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);
    $phone = trim($_POST["phone"]);

    // Check that data was sent to the mailer.
    if ( empty($name) OR empty($message) OR !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set a 400 (bad request) response code and exit.
        http_response_code(400);
        $checkoutdata = json_decode($_POST["data"], true);
        echo $checkoutdata[0]["part"];
        echo "Oops! There was a problem with your submission. Please complete the form and try again.";
        exit;
    }
}

// Replace sender@example.com with your "From" address.
// This address must be verified with Amazon SES.

// 1
$sender = '';

// 2
$senderName = '';

// Replace recipient@example.com with a "To" address. If your account
// is still in the sandbox, this address must be verified.
// 3
$recipient = '';

// Replace smtp_username with your Amazon SES SMTP user name.
// 4
$usernameSmtp = '';

// Replace smtp_password with your Amazon SES SMTP password.
// 5
$passwordSmtp = '';

// Specify a configuration set. If you do not want to use a configuration
// set, comment or remove the next line.
// $configurationSet = 'ConfigSet';

// If you're using Amazon SES in a region other than US West (Oregon),
// replace email-smtp.us-west-2.amazonaws.com with the Amazon SES SMTP
// endpoint in the appropriate region.
// 6
$host = '';
// 7
$port = ;

// The subject line of the email
// 8
$subject = '';

// The plain-text body of the email
//9
$bodyText =  "";

// The HTML-formatted body of the email
// $bodyHtml = 

// '<h1>Email Test</h1>
//     <p>This email was sent through the
//     <a href="https://aws.amazon.com/ses">Amazon SES</a> SMTP
//     interface using the <a href="https://github.com/PHPMailer/PHPMailer">
//     PHPMailer</a> class.</p>';

$checkoutdata = json_decode($_POST["data"], true);
$bodyHtml = '<html><body>';
// $bodyHTML .= "<span>Name: $name\n</span>";
$bodyHtml .= '<table rules="all" cellpadding="10">';
$bodyHtml .= '<tr><th>Part</th><th>Description</th><th>Quantity</th></tr>';

// $bodyHTML .= "Phone: $phone\n";
// $bodyHTML .= "Email: $email\n\n";
// $bodyHTML .= "Message:\n$message\n";
for ($i = 0; $i < count($checkoutdata); $i++) {
    $bodyHtml .= '<tr><td>' . $checkoutdata[$i]["part"] . '</td>';
    $bodyHtml .= '<td>' . $checkoutdata[$i]["description"] . '</td>';
    $bodyHtml .= '<td>' . $checkoutdata[$i]["quantity"] . '</td></tr>';
};
$bodyHtml .= '</table>';
$bodyHtml .= '<span><br/>' . $message . '</span>';
$bodyHtml .= '<span><br/>' . $name . '</span>';
$bodyHtml .= '<span><br/>' . $phone . '</span>';
$bodyHtml .= '</body></html>';

$mail = new PHPMailer(true);

try {
    // Specify the SMTP settings.
    $mail->isSMTP();
    $mail->setFrom($sender, $senderName);
    $mail->Username   = $usernameSmtp;
    $mail->Password   = $passwordSmtp;
    $mail->Host       = $host;
    $mail->Port       = $port;
    $mail->SMTPAuth   = true;
    $mail->SMTPSecure = 'tls';
    // $mail->addCustomHeader('X-SES-CONFIGURATION-SET', $configurationSet);

    // Specify the message recipients.
    $mail->addAddress($recipient);
    // You can also add CC, BCC, and additional To recipients here.

    // Specify the content of the message.
    $mail->isHTML(true);
    $mail->Subject    = $subject;
    $mail->Body       = $bodyHtml;
    $mail->AltBody    = $bodyText;
    $mail->Send();
    echo "Email sent!" , PHP_EOL;
} catch (phpmailerException $e) {
    echo "An error occurred. {$e->errorMessage()}", PHP_EOL; //Catch errors from PHPMailer.
} catch (Exception $e) {
    echo "Email not sent. {$mail->ErrorInfo}", PHP_EOL; //Catch errors from Amazon SES.
}

?>
