$(function () {


    // 定义一个查询的参数对象，将来请求数据的时候
    // 需要将请求参数对象提交到服务器
    let q = {
        pagenum: 1,//页码值，默认请求第一页数据
        pagesize: 2,//每页显示几条数据，默认煤业显示2条
        cate_id: '',//文章分类的ID
        state: ''//文章的发布状态
    }

    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage;

    // 定义美化事件的过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date);
        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 获取文章列表并渲染
    initTable()
    function initTable() {
        $.ajax({
            type: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {

                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)

            }
        })
    }

    //    获取文章分类并渲染
    initCate()
    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                let htmlStr = template('tpl-cate', res)

                $('[name=cate_id]').html(htmlStr)
                form.render()

            }
        })
    }
    // 为筛选表单添加 submit 事件 
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        // 重新渲染文章列表
        initTable()
    })

    // 定义渲染分页的方法
    // renderPage()
    // total

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            jump: function (obj,first) {
                q.pagenum = obj.curr              
                if (!first) {
                    //do something
                    initTable()
                }
            }
        })
    }
})