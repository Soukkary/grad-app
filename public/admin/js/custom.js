
$(document).ready(function(){
    //Check admin password is correct or not
    $("#current_pass").keyup(function(){
        var current_pass = $("#current_pass").val();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
            },
            type:'post',
            url:'/admin/check-current-password',
            data:{current_pass:current_pass},
            success:function(resp){
                if(resp=="false"){
                    $("#verifyCurrentPass").html("Current Password is Incorrect!")
                } else if(resp=="true"){
                    $("#verifyCurrentPass").html("Current Password is Correct!")
                }
            }, error:function(){
                alert("Error");
            }
        });
    });

    //Update CMS Page Status
    $(document).on("click", ".updateCmsPageStatus", function(){
        var status = $(this).children("i").attr("status");
        var page_id = $(this).attr("page_id");
        $.ajax({
            headers: {
                'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
            },
            type:'post',
            url:'/admin/update-cms-page-status',
            data:{status:status, page_id:page_id},
            success:function(resp){
                if(resp['status']==0){
                    $("#page-"+page_id).html("<i class='fas fa-toggle-off' style='color:grey' status='Inactive'></i>")
                } else if(resp['status']==1){
                    $("#page-"+page_id).html("<i class='fas fa-toggle-on' status='Active'></i>")
                }
            }, error:function(){
                alert("Error");
            }
        })
    });

    //Update Subadmin Status
    $(document).on("click", ".updateSubadminStatus", function(){
        var status = $(this).children("i").attr("status");
        var subadmin_id = $(this).attr("subadmin_id");
        $.ajax({
            headers: {
                'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content')
            },
            type:'post',
            url:'/admin/update-subadmin-status',
            data:{status:status, subadmin_id:subadmin_id},
            success:function(resp){
                if(resp['status']==0){
                    $("#subadmin-"+subadmin_id).html("<i class='fas fa-toggle-off' style='color:grey' status='Inactive'></i>")
                } else if(resp['status']==1){
                    $("#subadmin-"+subadmin_id).html("<i class='fas fa-toggle-on' status='Active'></i>")
                }
            }, error:function(){
                alert("Error");
            }
        })
    });

    //Confirm the deletion of CMS Page
    $(document).on("click", ".confirmDelete", function(){
        var name = $(this).attr('name');
        if(confirm("Are you sure you want to delete this "+name+"?"))
        {
            return true;
        }
        return false;
    })
});
