<?php

require('../../bootstrap.php');

render(
    'userCenter/teacherCenter/watermarkEdit',
    array(
        'tpl_data' => array(
            "watermark" => "http://test-img.gsxservice.com/625655_k5v3inv1.jpeg",
            "watermark_id" => 21212,
            "enable_watermark" => "1"
        )
    )
);
