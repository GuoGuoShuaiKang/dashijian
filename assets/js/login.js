$(function(){
    // 点击 去注册 按钮
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击 去登录 按钮
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    // 自定义用户名密码校验规则
    // 从 layui 中获取 form 对象
    let form = layui.form
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],//自定义了一个 pwd
        // 校验两次密码是否一致的规则
        repwd: function(value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败，则return一个提示消息即可
           let pwd = $('.reg-box [name=password]').val()
           if(pwd !== value) {
               return '两次密码输入不一致'
           }
        }
    })
    let layer = layui.layer
    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e) {
        e.preventDefault();
        $.post('/api/reguser',
        {username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()},
        function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message);
            }
            
            layer.msg('注册成功，请登录！');
            // 模拟点击行为跳转回登录页面
            $('#link_login').click()
        })
    })
    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                // 将登录成功得到的 token 字符串保存到 localStorage
                localStorage.setItem('token',res.token)
                // console.log(res.token);
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })

    })
})