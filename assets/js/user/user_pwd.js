$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新密码不能与原密码一致'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入的密码不一致'
            }
        }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                alert('修改密码成功，请重新登录！')
                // 清空本地存储中 token
                localStorage.removeItem('token')
                // 跳转到登录页
                window.parent.location.href = '/login.html'

            }
        })
    })
})