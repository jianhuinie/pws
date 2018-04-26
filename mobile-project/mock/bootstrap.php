<?php

//项目根目录
if (isset($PROJECT_ROOT)) {
    define("PROJECT_ROOT", $_SERVER['DOCUMENT_ROOT'] . DIRECTORY_SEPARATOR);
}


//
//define('ROOT_DIR', dirname(__DIR__) . DIRECTORY_SEPARATOR);
//define('SMARTY_DIR', dirname(__DIR__) . DIRECTORY_SEPARATOR . 'mock' . DIRECTORY_SEPARATOR . 'smarty' . DIRECTORY_SEPARATOR);
//define('VIEW_DIR', PROJECT_ROOT . 'src' . DIRECTORY_SEPARATOR);
//define('CACHE_DIR', PROJECT_ROOT . 'cache' . DIRECTORY_SEPARATOR);

define('ROOT_DIR', dirname(__DIR__) . DIRECTORY_SEPARATOR);
define('SMARTY_DIR', ROOT_DIR . 'mock' . DIRECTORY_SEPARATOR . 'smarty' . DIRECTORY_SEPARATOR);
define('VIEW_DIR', ROOT_DIR . 'src' . DIRECTORY_SEPARATOR);
define('CACHE_DIR', ROOT_DIR . 'cache' . DIRECTORY_SEPARATOR);

date_default_timezone_set('Asia/Shanghai');//'Asia/Shanghai'

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

    $smarty->left_delimiter = '{{';
    $smarty->right_delimiter = '}}';

    /**
     * user_type {Number} 0老师 2学生 （1家长，暂无该身份）
     */
    $smarty->assign('user_data', array(
        // "avatar" => "http://test.img.genshuixue.com/headpic_woman.png",
        // "user_type" => 2,
        // "user_id" => 1,
        // "user_number" => "332478808",
        // "user_name" => "沈佳宜沈佳宜沈佳宜",
        // "user_name_cut" => "沈佳宜...",
        // "mobile" => "13523145687"
    ));

    $ext_data = array(
        "is_app" => 1,
        "page" => "test",
        "is_tapp" => 0,
        "platform" => "android",
        "curr_city" => array(
           "id" => "17039360",
           "name" => "北京"
        )
    );

    if (isset($data['ext_data'])){
        $data['ext_data'] = array_merge($ext_data, $data['ext_data']);
    }else{
        $data['ext_data'] = $ext_data;
    }

    foreach ($data as $key => $value) {
        $smarty->assign($key, $value);
    }


    $smarty->assign('site_config', array(
        "baseUri" => "http://" . $_SERVER['HTTP_HOST'],
        "mainUri" => "http://" . $_SERVER['HTTP_HOST'],
        "staticBaseUri" => "http://" . $_SERVER['HTTP_HOST'] . '/',
        "protocol" => "http"
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
    $html = $smarty->fetch($tpl . '.tpl');

//    $server_name = $_SERVER['SERVER_NAME'];

//    $livereload = '<script src="http://localhost:8898/livereload.js"></script></body>';

//    $html = str_replace('</body>', '', $html);

    return $html;
};

/**
 * 通过curl抓取远程数据
 */
function fetch_data($url, $data=[], $method='GET', $cookies=[], $headers=[]) {
    $ch = curl_init();
    //处理post
    if ('POST' == $method) {
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    } else {
        $char = (false === strpos($url, '?')) ? '?' : '&';
        $strQuery = $data ? $char . http_build_query($data) : '';
        $url .= $strQuery;
        curl_setopt($ch, CURLOPT_URL, $url);
    }
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //处理cookie
    $cookies = array_merge($_COOKIE);
    if (!empty($cookies)) {
        $arrCookie = [];
        foreach ($cookies as $_k => $_v) {
            $arrCookie[] = sprintf('%s=%s', $_k, $_v);
        }
        $strCookie = join('; ', $arrCookie);
        curl_setopt($ch, CURLOPT_COOKIE, $strCookie);
    }
    //处理header
    if (!empty($headers)) {
        curl_setopt($ch,CURLOPT_HTTPHEADER,$headers);
    }
    $result = curl_exec($ch);
    return json_decode($result, true);
}
