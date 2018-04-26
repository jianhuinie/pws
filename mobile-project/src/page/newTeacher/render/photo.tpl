<div class="teacher-photo dynamic-child-box" data-type="photo">
{{foreach photoList as $item index}}
    <img data-src="{{$item.img}}" data-stype="m_teacher_photo" data-index="{{index}}">
{{/foreach}}
</div>