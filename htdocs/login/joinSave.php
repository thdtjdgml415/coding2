<?php
    include "../connect/connect.php";

    $youEmail = $_POST ['youEmail'];
    $youName = $_POST ['youName'];
    $youPass = $_POST ['youPass'];
    $youNickName = $_POST ['youNickName'];
    $youPhone = $_POST ['youPhone'];
    $regTime = time();
    //확인
    // echo $youEmail;
    // echo $youName;
    // echo $youPass;
    // echo $youNickName;
    // echo $youPhone;
    // echo $regTime;

    // $sql = "INSERT INTO myMember(youEmail, youName, youPass, youNickName, youPhone, regTime) VALUES('$youEmail','$youName','$youPass','$youNickName','$youPhone', '$regTime' );";

    // $result = $connect -> query($sql);
    // if($result){
    //     echo "INSERT INTO TRUE";
    // } else {
    //     echo "INSERT INTO FALSE";
    // }


    //데이터 가져오기 --> 유효성 검사 --> 데이터 중복검사(데이터 존재 유무 판단) --> 없으면 회원가입 완료
    //데이터 가져오기 --> 유효성 검사 --> 데이터 중복검사(데이터 존재 유무 판단) --> 있으면 로그인

    //이메일 중복 검사
    $isEmailCheck = false;

    $sql = "SELECT youEmail FROM myMember WHERE youEmail = '$youEmail'";
    $result = $connect -> query($sql);

    if($result){
        $count = $result -> num_rows;//변수가 있는지 확인

        if($count == 0) {
            //회원가입
            $isEmailCheck = true;
        } else {
            //로그인 유도
            echo "이미 아이디가 존재합니다.";
        }
    } else {
        echo "에러발생 - 방법이 없어요";
        exit; //작업을 끝냄
    }

    //핸드폰 번호 중복검사
    $isPhoneCheck = false;
    $sql = "SELECT youPhone FROM myMember WHERE youPhone = '$youPhone'";

    $result = $connect -> query($sql);

    if($result){
        $count = $result -> num_rows;//변수가 있는지 확인

        if($count == 0) {
            //회원가입
            $isPhoneCheck = true;
        } else {
            //로그인 유도
            echo "이미 아이디가 존재합니다.";
        }
    } else {
        echo "에러발생 - 방법이 없어요";
        exit; //작업을 끝냄
    }


    //회원가입
    if ( $isEmailCheck == true && $isPhoneCheck == true) {
        $sql = "INSERT INTO myMember(youEmail, youName, youPass, youNickName, youPhone, regTime) VALUES('$youEmail','$youName','$youPass','$youNickName','$youPhone', '$regTime' );";
        $result = $connect -> query($sql);


        if($result) {
            echo "회원가입을 축하합니다.!!!!!!";
        } else {
            echo "에러발생2 - 방법이 없다니까요..";
        }
    } else {
        echo "이메일 또는 핸드폰 번호가 틀립니다 다시 확인해주세요!";
    }

?>