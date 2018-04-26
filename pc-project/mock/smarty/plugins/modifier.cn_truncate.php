<?php
/**
 * 按中文显示宽度截断字符串
 *
 * @package    Smarty
 * @subpackage PluginsModifier
 * @author     zouyang <zouyang@baijiahulian.com>
 *
 * @param string  $string input string
 * @param integer $width  screen display width
 * @param string  $etc    end string
 *
 * @return string truncated string
 */
function smarty_modifier_cn_truncate($string, $width = 80, $etc = '…') {
    static $mb_width = 2;
    $haystack = preg_split('//u', $string, -1, PREG_SPLIT_NO_EMPTY);
    $target_length = $width * $mb_width;
    $length = 0;
    $needles = [];
    $over = [];
    $overflow = false;

    $char_width = static function ($char) use ($mb_width) {
        if (strlen($char) == 1 && ord($char) <=128 ) {
            $value = 1;
        } else {
            $value = $mb_width;
        }
        return $value;
    };

    $display_length =  static function ($str) use ($mb_width, $char_width) {
        mb_internal_encoding('UTF8');
        $_l = mb_strlen($str);
        $length = 0;
        for ($i = 0; $i < $_l; $i++) {
            $utf8Byte = mb_substr($str, $i, 1);
            $length += $char_width($utf8Byte);
        }
        return $length;
    };

    $min = $target_length - $display_length($etc);
    foreach ($haystack as $needle) {
        $length += $char_width($needle);
        $needles[] = $needle;
        if ($length <= $min) {
            $over = $needles;
        }
        if ($length > $target_length) {
            $overflow = true;
            break;
        }
    }
    if ($overflow) {
        return implode("", $over) . $etc;
    }
    return implode("", $needles);
}
