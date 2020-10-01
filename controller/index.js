class Controller{
    constructor(){
        this.posts=new Array();
        this.comments=new Array();
    }
    Create_Post(primo_piano){
        if(primo_piano === true){
            $('<div class="card my-2 mx-2 bg-dark text-white" style="width: 18rem;"><div class="card-body"><article><header ><h5 class="card-title">'+this.posts[(this.posts.length)-1].title+'<i class="fa fa-trophy text-white ml-1"></i><button class="btn btn-info button_pub float-right" type="button"><i class="fa fa-unlock"></i></button></h5></header><p class="card-text mt-4">'+this.posts[(this.posts.length)-1].body+'</p></article></div><div class="card-footer bg-light"><p class="text-dark">Lascia un commento:<br></p><input type="text" class="form-control mb-2 comment_text" placeholder="Inserisci il commento"><button class="btn btn-info mt-2 comment_button">Invia</button><ul class="list-group comment_section mt-2"></ul></div></div>').appendTo("#article_section_p");
        }else{
            $('<div class="card bg-dark my-2 mx-2 text-white" style="width: 18rem;"><div class="card-body"><article><header><h5 class="card-title">'+this.posts[(this.posts.length)-1].title+'<button class="btn btn-info mt-1  button_pub float-right" type="button"><i class="fa fa-unlock"></i></button</h5></header><p class="card-text mt-4">'+this.posts[(this.posts.length)-1].body+'</p></article></div><div class="card-footer bg-light"><p class="text-dark">Lascia un commento:<br></p><input type="text" class="form-control mb-2 comment_text" placeholder="Inserisci il commento"><button class="btn btn-info mt-2 comment_button">Invia</button><ul class="list-group comment_section mt-2" style="background-color: cadetblue"></ul></div></div>').appendTo("#article_section");
        }
    }
    Insert_Post(titolo, corpo, primo_piano){
        var Post_n= new Post(titolo, corpo);
        this.posts.push(Post_n);
        this.Create_Post(primo_piano);
    }
    Button_draft_public(punt, old_class, new_class, icon_name){
        $(punt).removeClass(old_class);
        $(punt).addClass(new_class);
        $(punt).html('<i class="'+icon_name+'"></i>');
    }
    save_Post(){
        var title= $('#recipient-title').val();
        var body=$('#text-body').val();
        if($('#customRadio1').is(":checked")){
            this.Insert_Post(title, body, true);
        }else{
            this.Insert_Post(title, body, false);
        }
    }
    reset_modal(){
        $('#recipient-title').val("");
        $('#text-body').val("");
        $('#customRadio1').prop('checked', false);
        $('#customRadio2').prop('checked', false);
        $('#modal_insert').modal('hide');
    }
    insert_Comment(punt){
        var text_com=$(punt.children('.comment_text')).val();
        var comm=new Comment(text_com);
        this.comments.push(comm);
        $(punt.children('.comment_text')).val("");
        $(punt.children('.comment_section')).append('<li class="list-group-item bg-info">Utente scrive: '+this.comments[(this.comments.length)-1].text_comment+'</li>');
    }
}
$(document).ready(function(){
    controller=new Controller();
    $('#send_article').click(function(){
        controller.save_Post();
        controller.reset_modal();
    });
})
$(document).on('click', '.button_pub', function(){
    var punt= this;
    controller.Button_draft_public(punt, "button_pub", "button_dra", "fa fa-lock");
});
$(document).on('click', '.button_dra', function(){
    var punt= this;
    controller.Button_draft_public(punt, "button_dra", "button_pub", "fa fa-unlock");
});
$(document).on('click', '.comment_button', function(){
    var punt= $(this).parent();
    controller.insert_Comment(punt);
})