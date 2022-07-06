$(function() {
    let layer = layui.layer
    let form =layui.form
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            methob:'GET',
            url:'/my/article/cates',
            success: function(res) {
                // console.log(res);
               var htmlStr = template('tpl-table',res)
                // console.log(htmlStr);
               $('tbody').html(htmlStr)
            }
        })
    }
    let indexAdd = ''
    $('#btnAddCate').on('click',function() {
       indexAdd = layer.open({
            type:1,
            area: ['500px', '240px'],
            title:'添加类别',
            content: $('#dialog-add').html()
        })
    })

    // 通过代理的形式，为 form-add 表单添加 submit 事件
    $('body').on('submit','#form-add',function(e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg('新增文章分类失败！')
                }
                layer.close(indexAdd)
                initArtCateList()
                layer.msg('新增文章分类成功！')
            }
        })
    })
    let indexEdit = null
    // 根据 id 修改文章分类
    // 通过代理的形式 为 btn-edit 按钮绑定点击事件
    $('tbody').on('click','.btn-edit',function() {
        indexEdit = layer.open({
            type:1,
            area: ['500px', '240px'],
            title:'修改类别',
            content: $('#dialog-edit').html()
        })

        let id =$(this).attr('data-id')
        
        $.ajax({
            type:'GET',
            url:'/my/article/cates/'+ id,
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form-edit',res.data)
            }
        })
    })
    // 通过代理的形式为 form-edit 添加 submit 事件
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg('修改分类失败！')
                }
                layer.close(indexEdit)
                initArtCateList()
                layer.msg('修改文章分类成功！')
            }
        })
    })
    // 根据 id 删除文章分类
    $('tbody').on('click','.btn-del',function() {
        let id =$(this).attr('data-id')
        layer.confirm('确认删除文章分类?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                type:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res) {
                    if(res.status !== 0) {
                        return layer.msg('删除文章分类失败！')
                    }
                    initArtCateList()
                    layer.msg('删除文章分类成功！')
                }
            })
            layer.close(index);
          });
       
    })
})