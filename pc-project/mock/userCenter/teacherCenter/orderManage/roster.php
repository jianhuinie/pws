<?php

require('../../../bootstrap.php');

render(
    'userCenter/teacherCenter/orderManage/roster',
    array(
        'tpl_data' => array(
            'wyj' => "it's me."
        )
    )
);