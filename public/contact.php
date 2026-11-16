<?php
/**
 * Contact form mail handler (runs on the cPanel server).
 *
 * The React contact page POSTs JSON here; this script emails the submission
 * to the site owner using the server's built-in mail().
 * Vite copies this file from /public into /dist on build, so it ends up next
 * to index.html in public_html.
 */

// ---- Settings ---------------------------------------------------------------
$TO_EMAIL   = 'michael@globalretirementfundsinc.com';
// Sender must be an address on this domain or many inboxes will reject/spam it.
$FROM_EMAIL = 'noreply@globalretirementfundsinc.com';
$FROM_NAME  = 'Global Retirement Funds Website';
// -----------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');

// Fallback in case the mbstring extension is disabled on the host.
if (!function_exists('mb_substr')) {
    function mb_substr($string, $start, $length)
    {
        return substr($string, $start, $length);
    }
}

function respond($code, $success, $message)
{
    http_response_code($code);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

// Accept JSON (from the React form) or a normal form post.
$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    $data = $_POST;
}

// Honeypot: real visitors never fill this hidden field, spam bots usually do.
if (!empty($data['website'])) {
    respond(200, true, 'Thank you!');
}

// Strip line breaks from single-line fields so they can't inject mail headers.
function clean_line($value, $max)
{
    $value = trim(str_replace(["\r", "\n"], ' ', (string) $value));
    return mb_substr($value, 0, $max);
}

$name    = clean_line($data['name'] ?? '', 100);
$email   = clean_line($data['email'] ?? '', 150);
$phone   = clean_line($data['phone'] ?? '', 50);
$message = mb_substr(trim((string) ($data['message'] ?? '')), 0, 5000);

if ($name === '' || $message === '') {
    respond(422, false, 'Please fill in your name and message.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Please enter a valid email address.');
}

$subject = 'New Contact Form Message from ' . $name;

$body  = "You have received a new message from the website contact form.\n\n";
$body .= "Name:    {$name}\n";
$body .= "Email:   {$email}\n";
$body .= 'Phone:   ' . ($phone !== '' ? $phone : 'Not provided') . "\n\n";
$body .= "Message:\n{$message}\n\n";
$body .= "---\nSent on " . date('Y-m-d H:i') . ' from ' . ($_SERVER['HTTP_HOST'] ?? 'website') . "\n";

$headers = [
    'From: ' . $FROM_NAME . ' <' . $FROM_EMAIL . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = mail($TO_EMAIL, $encodedSubject, $body, implode("\r\n", $headers), '-f' . $FROM_EMAIL);

if (!$sent) {
    respond(500, false, 'The message could not be sent. Please try again later.');
}

respond(200, true, 'Thank you! Your message has been sent.');
