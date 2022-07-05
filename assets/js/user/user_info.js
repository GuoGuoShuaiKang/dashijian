$(function() {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '长度必须在 1 ~ 6 个字符之间！'
            }
        }

        
    })
    initUserInfo()
    // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message);
                }
                // 调用 form.val() 快速为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }
    // 渲染用户基本信息
   
})