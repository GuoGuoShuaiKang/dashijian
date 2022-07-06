
$(function () {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()
    //    退出点击事件
    var layer =layui.layer
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认推出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
           
            // 清空本地存储中 token
            localStorage.removeItem('token')
            // 跳转到登录页
            location.href='/login.html'
            // 关闭 cofirm 询问框
            layer.close(index)
        });
    })



})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return console.log(res.message)

            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
            
        }
        

    })
}
// 渲染用户头像
function renderAvatar(user) {
    //  设置用户的名称
    var name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp&nbsp' + name)
    // 判断是否又图片头像进行渲染头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()

    } else {
        let first = name[0].toUpperCase()
        $('.layui-nav-img').hide()
        $('.text-avatar').html(first).show()
    }

}