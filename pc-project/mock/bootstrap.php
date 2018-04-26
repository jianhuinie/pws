<?php

define('ROOT_DIR', dirname(__DIR__) . DIRECTORY_SEPARATOR);
define('SMARTY_DIR', ROOT_DIR . 'mock' . DIRECTORY_SEPARATOR . 'smarty' . DIRECTORY_SEPARATOR);
define('VIEW_DIR', ROOT_DIR . 'view' . DIRECTORY_SEPARATOR);
define('CACHE_DIR', ROOT_DIR . 'cache' . DIRECTORY_SEPARATOR);
define('MOCK_DIR', ROOT_DIR . 'mock' . DIRECTORY_SEPARATOR);

date_default_timezone_set('Asia/Shanghai');

/**
 * 递归创建目录，如果目录不存在的话，则创建之
 *
 * @param $dir 要创建的目录
 * @return bool
 */
function mkdir_if_no_exist($dir) {
    if (is_dir($dir)) {
        return true;
    }
    if (!mkdir_if_no_exist(dirname($dir))) {
        return false;
    }
    return mkdir($dir);
}

/**
 * 删除目录
 *
 * @param $dir
 */
function rrmdir($dir) {
    if (is_dir($dir)) {

        $dir = rtrim($dir, DIRECTORY_SEPARATOR . ' ') . DIRECTORY_SEPARATOR;
        $files = scandir($dir);

        foreach ($files as $file) {
            if ($file !== '.' && $file !== '..') {
                rrmdir($dir . $file);
            }
        }

        rmdir($dir);
    }
    else if (file_exists($dir)) {
        unlink($dir);
    }
}

function getSmarty($data) {

    require_once(SMARTY_DIR . 'Smarty.class.php');

    $smarty = new Smarty();

    $smarty->setTemplateDir(VIEW_DIR);
    $smarty->setCompileDir(CACHE_DIR);

    $smarty->left_delimiter = '{{ ';
    $smarty->right_delimiter = ' }}';

    $smarty->assign('user_data', array(
        "private_domain" => "domaincqyzs",
        "mobile" => "152****1234",
        "user_type" => "2", // 0老师 2学生
        "user_id" => 1,
        "avatar" => "http://img.gsxservice.com/headpic_man.png",
        "display_name" => "从前有座山山上有座庙庙里有个老和尚就是贫僧要不讲个故事？",
        "user_name" => "知之为知之",
        "user_name_cut" => "烦人",
        "user_number" => "982316038",
        "show_name" => "为啥还有个这名字啊",
        "show_avatar" => "http://test-img.gsxservice.com/726062_iift9sfh.jpeg",
        "rank_activity_seniority" => 1,
        'qreserve_remind' => 1, // 闪电约课弹窗 0不再提醒 1提醒
        'qreserve_global_sign' => 1 ,// 开启全部老师闪电约课功能 1开启 0关闭
        'source_sys_id' => 888888,
        "from_shizi_login" => false,
        "permission" => array(
            "class_course" => false,
            "global_district" => false
        ),
        "vip_level" => 2, // 0非会员 1普通会员 2高级会员 3超级会员

        // "org_id" => 123, // 后端没给
        // "org_mobile" => '', // 后端没给
        // 'favor_percent' => 40, // 后端没给
        'total_integral' => 225, // 老师学分 // 后端没给
        // 'join_divide' => true, // 是否参与视频分成 // 后端没给

    ));

    $smarty->assign('ext_data', array(
        'has_checkin' => false, // 今日签到与否
        'checkin_serial_day' => 321, // 连续签到天数
        'teacher_center_notify' => array(
            array(
                'title' => '哈哈哈啊啊啊啊啊啊啊啊啊啊吖',
                'link' => 'http://baidu.com'
            ),
            array(
                'title' => '哈哈哈',
                'link' => 'http://baidu.com'
            ),
            array(
                'title' => '哈哈哈',
                'link' => 'http://baidu.com'
            ),
        )
    ));

    $smarty->assign('friend_links', array(
        array(
            "link" => "http://hao.360.cn",
            "title" => "360"
        ),
        array(
            "link" => "http://hao.360.cn",
            "title" => "360"
        )
    ));

    $smarty->assign('curr_city', array(
        "id" => "17039360",
        "name" => "北京",
        "domain" => "tj"
    ));

    $smarty->assign('is_spider', false);

    foreach ($data as $key => $value) {
        $smarty->assign($key, $value);
    }

    $smarty->assign('site_config', array(
        "env" => "beta",
        "baseUri" => "http://" . $_SERVER['HTTP_HOST'],
        "mainUri" => "http://" . $_SERVER['HTTP_HOST'] . '/',
        "protocol" => "http",
        "staticBaseUri" => "http://" . $_SERVER['HTTP_HOST'] . '/',
        //"staticBaseUri" => 'http://test-qh.genshuixue.com',
        "csrfTokenName" => '123',
        "csrfTokenValue" => '123'
    ));

    $smarty->assign('log_data', array(
        "page" => "local-dev"
    ));

    $smarty->assign('ts', time());

    return $smarty;
}

/**
 * 渲染模板
 *
 * @param {String} $tpl 模板路径，相对 view/
 * @param {Array} $data
 */
function render($tpl, $data) {
    echo fetch($tpl, $data);
};


/**
 * 渲染模板
 *
 * @param {String} $tpl 模板路径，相对 view/
 * @param {Array} $data
 * @return {String}
 */
function fetch($tpl, $data) {
    $smarty = getSmarty($data);
    $html = $smarty->fetch($tpl . '.html');
    return $html;
};
