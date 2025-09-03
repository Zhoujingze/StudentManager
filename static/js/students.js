$(document).ready(function() {
    // 初始化DataTable
    var table = $('#studentsTable').DataTable({
        language: {
            "lengthMenu": "显示 _MENU_ 条记录",
            "search": "搜索:",
            "paginate": {
                "first": "首页",
                "last": "末页",
                "next": "下一页",
                "previous": "上一页"
            },
            "info": "显示第 _START_ 至 _END_ 条，共 _TOTAL_ 条记录",
            "infoFiltered": "（从 _MAX_ 条总记录中筛选）",
            "infoEmpty": "显示第 0 至 0 条，共 0 条记录",
            "zeroRecords": "没有找到匹配的记录"
        }
    });
    
    // 搜索功能
    $('#searchBtn').click(function() {
        table.columns(0).search($('#searchId').val());
        table.columns(1).search($('#searchName').val());
        table.columns(2).search($('#searchAge').val());
        table.columns(3).search($('#searchGender').val());
        table.columns(4).search($('#searchClass').val());
        table.draw();
    });
    
    // 保存学生
    $('#saveStudentBtn').click(function() {
        const formData = $('#addStudentForm').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        
        $.ajax({
            url: '/api/students',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function() {
                location.reload();
            }
        });
    });
    
    // 编辑按钮点击事件
    $(document).on('click', '.edit-btn', function() {
        const studentId = $(this).data('id');
        const row = $(this).closest('tr');
        
        $('#editStudentId').val(studentId);
        $('#editStudentName').val(row.find('td:eq(1)').text());
        $('#editStudentAge').val(row.find('td:eq(2)').text());
        $('#editStudentGender').val(row.find('td:eq(3)').text());
        $('#editStudentClass').val(row.find('td:eq(4)').text());
        
        $('#editStudentModal').modal('show');
    });
    
    // 删除按钮点击事件
    $(document).on('click', '.delete-btn', function() {
        const studentId = $(this).data('id');
        
        if (confirm('确定要删除这个学生吗？')) {
            $.ajax({
                url: '/api/students/' + studentId,
                type: 'DELETE',
                success: function() {
                    location.reload();
                },
                error: function(xhr) {
                    alert('删除失败: ' + (xhr.responseJSON?.message || xhr.statusText));
                }
            });
        }
    });
    
    // 更新学生信息
    $('#updateStudentBtn').click(function() {
        const formData = $('#editStudentForm').serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});
        
        $.ajax({
            url: '/api/students/' + formData.id,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function() {
                location.reload();
            },
            error: function(xhr) {
                alert('更新失败: ' + (xhr.responseJSON?.message || xhr.statusText));
            }
        });
    });
});