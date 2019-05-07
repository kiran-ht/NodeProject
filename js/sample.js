var sup=document.querySelector('sup');
console.log("sup",sup);
var elmt=document.querySelector('.dropdown-menu');

sup.innerHTML=$('.spanclass').length; 
      $(document).ready(()=>{
            const display = $("#display");


        const getmessages = () =>{
            fetch('/getmessages',{method: "get"}).then((response)=>{
                return response.json();  
            }).then((data)=>{
               
                displaymsgs(data);
            });
        }

        getmessages();

        const deletemsg = (messages,listitemid,deleteid) =>{
            let deletebtn = $('#'+deleteid);
            deletebtn.click(() =>{
												
                fetch('/'+messages._id,{
                    method: "delete"
                }).then((response)=>{
                    return response.json();
                }).then((data)=>{
                    if(data.ok == 1){
                        $('#'+listitemid).remove();
                        						sup.innerHTML=$('.spanclass').length;
                                                  a=$('.spanclass').length;
												//  console.log("a=",a);
												  
                                                  if($('.spanclass').length===0){
													  elmt.classList.add('n');
													  sup.classList.add('n');
													  console.log("n is added");					
											  }
											  
											  
                    }
				});
				event.stopPropagation();
			});
			
			
        }

      const build = (messages)=>{
        return {
          deleteid : "delete_" + messages._id,
          listitemid: "listitem_" + messages._id,
          msgid: "message_" + messages._id
        }
      }
      const buildtemplate = (messages,ids)=>{
        var msg = messages.msg;
        console.log(msg);
                  sup.innerHTML=$('.spanclass').length+1; 
				  console.log("len=",($('.spanclass').length));
				 
        return '<a class="dropdown-item" href="#" id="'+ids.listitemid+'"><span class="spanclass" id="'+ids.msgid+'"><i class="fa fa-trash" aria-hidden="true" id="'+ids.deleteid+'"></i></span>'+msg+'</a>';
                 
      }

      const displaymsgs = (data)=>{
          data.forEach((messages)=>{
            let ids = build(messages);
			display.append(buildtemplate(messages,ids));
			 deletemsg(messages,ids.listitemid,ids.deleteid);
		  });
		  
      }
    });


    // $('#bell').click(()=>{
            //   $.ajax({
                // url: 'getmessages/',
                // type: 'GET',
                // datatype: 'json',
            //     success: (data)=>{
            //       console.log("success");
            //     }
            //   });
            // });