let $dispList = $('#list');
let $ul = $('#posts');

// =============================GET==============================
$(document).ready(function() {
  $.ajax({
    url: 'http://localhost:3000/todos',
    type: 'GET',
    headers: {'Content-Type': 'application/json;charset=utf-8'},
    dataType: 'json',
  }).done(function(data) {  
  $dispList.append(data.map(function(data) {   
    if(data.completed === true) {      
    return `<li class="toDo" value="${data.id}" id="${data.id}" data-id="${data.id}" data-title="${data.title}" data-completed="${data.completed}"> Id: ${data.id} Title: ${data.title}. Completed: ${data.completed}</li>`;
    } else {
      return `In progress<li class="toggle toDo" value="${data.id}" id="${data.id}" data-id="${data.id}" data-title="${data.title}" data-completed="${data.completed}">Id: ${data.id} Title: ${data.title}. Completed: ${data.completed} - Status In progress </li>`;
    }
  }));
  });
});

// =========================POST==============================
$(document).ready(function () {
  $("#formId").submit(function (event) {
    let formData = {
      id: '',
      title: $("#inputTitle").val(),
      completed: false,            
    };

    $.ajax({
      type: 'POST',
      url: 'http://localhost:3000/todos',
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      data: JSON.stringify(formData),
      dataType: 'json',
    }).done(function (data) {
      console.log('Sucsessfuly', data);
      location.reload(false);
    });
    event.preventDefault();
  });
});

// ==================PATCH=========================================
$(document).ready(function () {
  $dispList.click(function (event) {    
    let $id = event.target.value;   
    let $completedStatus = $(`li#${$id}`).attr('data-completed');
    if ($completedStatus === 'false') {    
      $status = true;
    } else {
      $status = false;
    };    
    let formData = {
      completed: $status,            
    };

    $.ajax({
      type: 'PATCH',
      url: `http://localhost:3000/todos/${$id}`,
      headers: {'Content-Type': 'application/json;charset=utf-8'},
      data: JSON.stringify(formData),
      dataType: 'json',
    }).done(function (data) {
      location.reload(false);
      console.log('data', data); 
    });
    event.preventDefault();
  });
});

// ========================DELETE==================================
$(document).ready(function () {
  $dispList.on('contextmenu', (event) => {
    let $target = $(event.target);
    if($target.is('li')) {
      let $id = event.target.value;  
      deleteToDo($id);
    } else {
      console.log('This is not LI')
    }
  })
})
function deleteToDo(id) {
  $.ajax({
      url: `http://localhost:3000/todos/${id}`,
      type: 'DELETE',
      success: function (result) {
        location.reload(false);
        console.log('success', result)
      }
  });
}
// =============================================================