<?php

  $inputQuestion=$_POST['inputQuestion'];
  $category=$_POST['selectBox'];
  $name=$_POST['username'];
  $email=$_POST['email'];
  $phone=$_POST['phone'];
  $wantWhen=$_POST['wantWhen'];
  $budget=$_POST['budget'];
  $anythingElse=$_POST['anythingElse'];

$formContent=<<<content

  Front Page Question: $inputQuestion
  Category: $category
  UserName: $name
  Email: $email
  Phone: $phone
  I Want It: $wantWhen
  Budget: $budget
  Anything Else: $anythingElse

  Lijep pozdrav :)

  Jesi dobija ovaj email?
content;

    $from="From: $username<$email>\r\nReturn-path: $email";
    $subject="I Want A Deal";
    mail("goretamarko@hotmail.co.uk", $subject, $formContent, $from);

?>