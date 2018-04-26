{{*

@file: 单独用一个组件来设置图片大小，避免显示小图却加载大图片

       参数：

       url 必传
       width 必传
       height 可选
       class 可选，图片 class
       alt 可选，说明文字，当图片加载失败，会显示出来
       number 可选，图片对应的number 例如，用户头像，就应该对应用户number
       no_crop 可选，是否不裁剪

@author: zhujialu

*}}
{{strip}}

{{if isset($class)}}
    {{$class = ' class="'|cat: $class|cat: '"'}}
{{else}}
    {{$class = ''}}
{{/if}}

{{if isset($alt)}}
    {{$alt = ' alt="'|cat: $alt|cat: '"'}}
{{else}}
    {{$alt = ''}}
{{/if}}

{{if isset($number)}}
    {{$number = ' data-number="'|cat: $number|cat: '"'}}
{{else}}
    {{$number = ''}}
{{/if}}

{{* 暂时只有下面这几种尺寸，先写死 *}}

{{$width2height = [ ]}}
{{$width2height['160'] = 120}}
{{$width2height['180'] = 134}}
{{$width2height['48'] = 48}}
{{$width2height['60'] = 60}}
{{$width2height['80'] = 80}}
{{$width2height['120'] = 120}}
{{$width2height['150'] = 150}}
{{$width2height['240'] = 170}}
{{$width2height['167'] = 167}}

{{$parts = explode('.', $url)}}
{{$extname = array_pop($parts)}}

{{if $extname === 'gif'}}
    {{$extname = 'jpg'}}
{{/if}}

{{if isset($no_crop) && $no_crop}}
    {{$crop_value = '0'}}
{{else}}
    {{$crop_value = '1'}}
{{/if}}

{{if !isset($height)}}
    {{$height = $width2height[$width]}}
{{/if}}

{{$width = intval($width)}}
{{$height = intval($height)}}

{{$scaled_url = $url|cat: "@"|cat: $crop_value|cat: "e_"|cat: $width|cat:"w_"|cat: $height|cat: 'h_1c_0i_1o_70Q_1x.'|cat: $extname}}


<img src="{{$scaled_url}}" data-url="{{$url}}" {{$class}}{{$alt}}{{$number}} />
{{/strip}}
