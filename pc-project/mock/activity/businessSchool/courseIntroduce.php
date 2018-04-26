<?php

require("../../bootstrap.php");

render(
    "activity/businessSchool/courseIntroduce",
    array(
        "tpl_data" => array(
            "courses_introduce" => array(
                array(
                    "id" => "305",
                    "catid" => "1030",
                    "tags" => "anchor1",
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574c257743125.png",
                ),
                array(
                    "id" => "305",
                    "catid" => "1030",
                    "tags" => "anchor2",
                    "imgUrl" => "http://test-img.gsxservice.com/0cms/d/file/content/2016/05/574c257743125.png",
                )
            )
        )
    )
);