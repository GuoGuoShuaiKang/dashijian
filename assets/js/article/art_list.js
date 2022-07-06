$(function() {
    // 定义一个查询的参数对象，将来请求数据的时候
    // 需要将请求参数对象提交到服务器
    let q = {
        pagenum: 1,//页码值，默认请求第一页数据
        pagesize:2,//每页显示几条数据，默认煤业显示2条
        cate_id:'',//文章分类的ID
        state:''//文章的发布状态
    }

    let layer = layui.layer
    let form = layui.form

    initTable()
    function initTable() {
        $.ajax({
            type:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res) {
                console.log(res);
                if(res.status !== 0)  {
                    return layer.msg('获取文章列表失败')
                }
                let htmlStr = template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
    }
})