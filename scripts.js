
const addCards = (items) => {
    items.forEach(item => {
        // let itemToAppend = '<div class="col s4 center-align">' +
        //     '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.path + '">' +
        //     '</div><div class="card-content">' +
        //     '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="#">' + item.path + '</a></p></div>' +
        //     '<div class="card-reveal">' +
        //     '<span class="card-title grey-text text-darken-4">' + item.subTitle + '<i class="material-icons right">close</i></span>' +
        //     '<p class="card-text">' + item.description + 'Test desc</p>' +
        //     '</div></div></div>';
        let itemToAppend =`
        <div class="col s4 center-align">
          <div class="card medium"><div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${item.path}">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${ item.title}<i class="material-icons right">more_vert</i></span>
            <p><a href="${item.path}">${item.title}</a></p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4"> ${item.subTitle} <i class="material-icons right">close</i></span>
            <p class="card-text grey-text"> ${item.description} </p>
          </div>
        </div>
        `;

        $("#card-section").append(itemToAppend);
    });
}

function formSubmitted() {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    postCat(formData);
}


function postCat(cat) {
    $.ajax({
        url: '/api/cat',
        type: 'POST',
        data: cat,
        success: (result) => {
            if (result.statuscode === 201) {
                alert('cat post successful');

                // Clear Form Inputs
                $('#title').val("");
                $('#subTitle').val("");
                $('#path').val("");
                $('#description').val("");

            }
        }
    })
}

function getAllCats() {
    $.get('/api/cats', (response) => {
        if (response.statuscode === 200) {
            addCards(response.data);
        }
    });
}

$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        formSubmitted();
    });
    $('.modal').modal();
    getAllCats();

});
