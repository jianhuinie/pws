{{ -- tpl:photo-item -- }}
<div class="uploaded-item">
    <img src="<%= _this.url %>@1e_188w_106h_1c_0i_1o_90Q_1x.jpeg" data-storage-id="<%= _this.id %>"/>
    <div>
        <label class="form-radio"><input type="radio" name="cover" value="<%= _this.id %>">设为封面</label>
    </div>
    <div class="action move-up icon icon-arrow-up">上移</div>
    <div class="action move-down icon icon-arrow-down">下移</div>
    <div class="action delete-item icon icon-delete">删除</div>
</div>
{{ -- /tpl -- }}