<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>비밀번호 찾기</title>
        <link rel="stylesheet" href="../assets/css/reset.css" />
        <link rel="stylesheet" href="../assets/css/common.css">
        <link rel="stylesheet" href="../assets/css/fonts.css" />
        <link rel="stylesheet" href="../assets/css/findPw.css" />
    </head>
    <body>
    <?php include "../include/header.php" ?>
    <!-- //header -->
        <main>
            <div class="login__popup">
                <div class="login__wrap">
                    <div class="login__inner">
                        <div class="login__box container">
                            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" name="findPw" onsubmit="return loginChecks()">
                                <fieldset>
                                    <h2>IT.<em>D</em></h2>
                                    <span>Find Password 🔍</span>
                                    <legend class="blind">비밀번호 찾기 폼</legend>
                                    <p class="login__desc">회원가입 시 입력한 이메일과 아이디를 통해 비밀번호를 찾아보세요. 임시 비밀번호를 이메일로 보내드립니다!</p>
                                    <div class="login__id">
                                        <p class="input__title">ID</p>
                                        <label for="youID">ID</label>
                                        <input type="id" name="youID" id="youID" placeholder="아이디를 입력해주세요." class="input__style1" required />
                                        <p class="youIdComment"></p>
                                    </div>
                                    <div>
                                        <p class="input__title">E-MAIL</p>
                                        <label for="youEmail">이메일</label>
                                        <input type="email" name="youEmail" id="youEmail" placeholder="이메일을 입력해주세요." class="input__style2" required />
                                        <p class="youEmailComment"></p>
                                    </div>
                                    <a href="userFindId.php">아이디 찾기</a>
                                    <button type="submit" class="input__button">비밀번호 변경하기</button>
                                    <button type="submit" class="join__button">이전 페이지로 돌아가기</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- //footer -->
        <?php include "../include/footer.php" ?>
        <script>
                function joinChecks(){
                    //아이디 공백 검사
                    document.querySelector('.erro').innerText = ''
                    if($("#youId").val() == ""){
                        $("#youIdComment").text("ID을 입력해주세요!");
                        return false;
                    }
                    //아이디 유효성 검사
                    let getyouId = RegExp(/^[a-zA-Z0-9]+/);
                    if(!getyouId.test($("#youId").val())){
                          $("#youIdComment").text("ID 형식에 맞게 작성해주세요!");
                          $("#youId").val('');
                    }

                    //이메일 공백 검사
                    if($("#youEmail").val() == ""){
                        $("#youEmailComment").text("이메일을 입력해주세요!");
                        return false;
                    }

                    //이메일 유효성 검사
                    let getYouEmail = RegExp(/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/);
                    if(!getYouEmail.test($("#youEmail").val())){
                        $("#youEmailComment").text("이메일을 형식에 맞게 작성해주세요!");
                        $("#youEmail").val('');
                        return false;
                    }

                    //이메일 중복 검사
                    if(emailCheck == false) {
                        $("#youEmailComment").text("이메일 중복 검사를 해주세요!");
                        return false;
                    }
                }

                document.querySelector(".join__button").addEventListener("click", () => {
                   history.back();
                });

                function userCheck(){
                    let youEmail = $("#youEmail").val();
                    let youId = $("#youId").val();
                    if(youEmail == null || youEmail == ''){
                        $("#youEmailComment").text("이메일을 입력해주세요!!");
                    } else if(youId == null || youId == ''){
                        $("#youIdComment").text("아이디 입력해주세요!!");
                    } else {
                        $.ajax({
                            type : "POST",
                            url : "userCheck.php",
                            data : {"youEmail": youEmail, "type": "emailCheck"},
                            dataType : "json",
                            success : function(data){
                                if(data.result == "good"){
                                    $("#youEmailComment").text("사용 가능한 이메일입니다.");
                                    emailCheck = true;
                                } else {
                                    $("#youEmailComment").text("이미 존재하는 이메일입니다.");
                                    emailCheck = false;
                                }
                            },
                            error : function(request, status, error){
                                console.log("request" + request);
                                console.log("status" + status);
                                console.log("error" + error);
                            }
                        })
                }
        }
        </script>
        <?php
        if($userID = $_POST['youId']){
               $userID = $_POST['youId'];
               $userEmail = $_POST['youEmail'];

               // echo $youEmail, $youPass; 
               $userID = $connect -> real_escape_string(trim($userID));
               $userEmail = $connect -> real_escape_string(trim($userEmail));

               // 데이터 가져오기 --> 유효성 검사  -->  데이터 조회  --> 로그인
               $sql = "SELECT userMemberID, userEmail, userID FROM userMember WHERE userId = '$userID' AND userEmail = '$userEmail'";
               $result = $connect -> query($sql);

               if($result){
                   $count = $result -> num_rows;
            
                   if($count != 0){
                       echo "<script>document.querySelector('.erro').innerText = '로그인성공'</script>";
                       $info = $result -> fetch_array(MYSQLI_ASSOC);
                       $_SESSION['userMemberID'] = $info['userMemberID'];
                       $_SESSION['userId'] = $info['userID'];
                       $_SESSION['userName'] = $info['userName'];
                       // echo "<pre>";
                       // var_dump($info);
                       // echo "</pre>";
                       echo "<script>location.href = '../main/main.php';</script>";

                   } else {
                       echo "<script>document.querySelector('#youId').value = '$userID'</script>"; 
                       echo "<script>document.querySelector('.erro').innerText = '아이디 또는 비밀번호가 틀렸습니다.'</script>"; 
                   }
               } else {
                   echo "<script>document.querySelector('.erro').innerText = '에러발생 - 관리자에게 문의하세요!'</script>"; 
               }
            }
    ?>
    </body>
</html>
