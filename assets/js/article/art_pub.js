$(function () {
    let layer = layui.layer
    let form = layui.form

    initCate()
    // 初始化富文本编辑器
    initEditor()

    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 封面裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 为选择封面的按钮绑定点击事件
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    // 监听 coverFile 的 change 事件，获取用户选择的文件列表
    $('#coverFile').on('change', function (e) {
        var files = e.target.files
        if (files.length === 0) {
            return layer.msg('上传图片失败')
        }
        // 根据选择的文件，创建一个对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })
    //    定义文章的发布状态
    let art_state = '已发布'
    //    为存为草稿按钮，绑定点击事件
    $('#btnSave2').on('click', function () {
        art_state = '草稿'
    })
    // 为表单绑定 submit 事件
    $('#form-pub').on('submit', function (e) {
        //  阻止表单的默认提交行为
        e.preventDefault()
        // 基于 form 表单，快速创建一个 FormData 对象
        var fd = new FormData($(this)[0])
        // 将文章的发布状态存到 fd 中
        fd.append('state', art_state)

        
        // 将封面裁剪过后的图片输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 发起 ajax 数据请求
                fd.forEach(function(v,k) {
                    console.log(k,v);
                })
                console.log(11);
                publishArticle(fd)
            })


    })
    // 定义发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType:false,
            processData:false,
            success:function(res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                location.href = '/article/art_list.html'
            }
        })
    }
})
