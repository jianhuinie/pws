<?php

require("../bootstrap.php");

$json = json_decode(file_get_contents('./json/360.json'), true);

$json1 = '
{
      "code": 2,
      "data": {
          "provinces": [
           {
              "province_id": 16777216,
              "province"  : "北京"
           },
           {
              "province_id": 33554432,
              "province"  : "安徽"
           }
           ],
          "curr_city": {
              "id": "17039360",
              "name": "北京"
           },
          "curr_province": {
              "id": "",
              "name": "北京"
           },
          "courses": {
              "exams": {
                  "title": "留学考试",
                  "more_url": "xxx",
                  "content" : {
                        "key" : "托福",
                        "subject_id" : "784_785",
                        "details": [
                         {
                            "course_number":"150308480013",
                            "teacher_name": "张",
                            "org_name":"组织名称",
                            "name":"班课名称",
                            "cover" : "http://img.gsxservice.com/2846962_mgtekcd5.jpeg" ,
                            "price": "200",
                            "original_price": "240",
                            "begin_time":"09月10日",
                            "course_url" : "http://baidu.com",
                            "teacher_url" : "xxx",
                            "org_url" : "xxx"
                        }
                      ]
                  },
                  "hot_news": [
                  {
                    "subject" : "xxx",
                    "url"     : "xxx"
                  }
                  ],
                  "hot_orgs": [
                  {
                        "logo"    : "xxx",
                        "title"   : "xxx",
                        "address" : "xxx",
                        "phone"   : "xxx",
                        "desc"    : "xxx"
                   }
                  ]
          },
          "skills": {},
          "others": {}
      },
      "ts": "用时",
      "msg": "succ"
    }
}';
// $json = json_decode($json1, true);
// $json_t = $json['data'];
// // print_r($json_t);
// // return;



// print_r($json);
// return;



$array = '';

if ($_GET){


// 渲染模版
  // render(
  //     "navigation/360/360list",
  //     array(
  //         // "tpl_data" => $json_t
  //         "tpl_data" => $json
  //     )
  // );


  $jk = '{
      "code": 2,
      "data": {
        "tpl": "大在在在"
      }
    }';
    // $bb = json_decode($jk, true);

  // print_r($bb);
    // echo $bb;
    echo $jk;
return;

    // js
    $jj = json_encode($json['courses']['exams']['content'][0]['details'], true);
    // $jj = json_encode($json['courses']['exams']['content'][0], true);

    echo $jj;
    // echo $array;

    return;
}




render(
    "navigation/360",
    array(
        // "tpl_data" => $json_t
        "tpl_data" => $json
    )
);

?>
