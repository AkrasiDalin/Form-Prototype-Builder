$( function() {
    $( "#sortable" ).sortable({
        // revert: true
    });
    $( ".draggable" ).draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "false",
        appendTo: "#sortable",
        distance: "100",
        stop: function( event, ui ) {
            let elemID = ui.helper.prevObject.attr('id');
            console.log("act full:",elemID)
            console.log("act helper:",ui.helper[0])
            switch (elemID){
                case 'date-box':
                    console.log('DateBox')
                    ui.helper.replaceWith(DateBox()).draggable();
                    break;
                case 'text-box':
                    console.log('TextBox')
                    ui.helper.replaceWith(TextBox()).draggable();
                    break;
                case 'section-label':
                    console.log('SectionLabel')
                    ui.helper.replaceWith(SectionLabel()).draggable();
                    break;
                case 'label':
                    console.log('Label')
                    ui.helper.replaceWith(Label()).draggable();
                    break;
                case 'info-label':
                    console.log('InfoLabel')
                    ui.helper.replaceWith(InfoLabel()).draggable();
                    break;
                case 'drop-down':
                    console.log('DropDown')
                    ui.helper.replaceWith(DropDown()).draggable();
                    break;
                case 'text-area':
                    console.log('TextArea')
                    ui.helper.replaceWith(TextArea()).draggable();
                    break;
                case 'info-box':
                    console.log('InfoBox')
                    ui.helper.replaceWith(InfoBox()).draggable();
                    break;
                case 'check-box':
                    console.log('CheckBox')
                    ui.helper.replaceWith(CheckBox()).draggable();
                    break;
                case 'table':
                    console.log('Table')
                    ui.helper.replaceWith(Table()).draggable();
                    break;
                case 'radio-button':
                    console.log('RadioButton')
                    ui.helper.replaceWith(RadioButton()).draggable();
                    break;
                default: '';
            }
            
            // ui.helper.find(".delete").click(function(){console.log(this.closest('.draggable').remove())});
       },
    //    create: function( event, ui ) {
    //         console.log("create")
    //     },
        // drag: function( event, ui ) {
        // console.log("drag")
        // },
        // start: function( event, ui ) {
        //     console.log("start")
        // },
        // stop: function( event, ui ) {
        //     console.log("stop")
        // },
    });
    $( "ul, li" ).disableSelection();

    // $(".delete").click(function(){console.log(this.closest('.draggable').remove())});
} );

const Options = () => {
    const dragBtn = $('<button/>', {
        id: 'drag',
        // class: 'btn',
        text: 'X'
    }).click(function(){$(this).closest('li').remove()});


    let menu = `
    <div class="dropdown">
  <button type="button" class="btn btn-primary  bi bi-tools" data-bs-toggle="dropdown">
    </button>
    <ul class="dropdown-menu">
        <input type='text'>
        <li><a class="dropdown-item" href="#">Link 2</a></li>
        <li><a class="dropdown-item" href="#">Link 3</a></li>
    </ul>
    </div>
    `;
    const editBtn = $(menu) 
    // {
    //     id: 'edit',
    //     class: 'bi bi-tools',
    //     // text: ''
    // }).click(function(){$(this).closest('li').remove()});

    const deleteBtn = $('<button/>', {
        class: 'bi bi-trash',
        // text: 'X'
    }).click(function(){$(this).closest('li').remove()});

    return $("<div>", {class: 'options btn-group'}).append([editBtn, deleteBtn])
}

const DateBox = () => {
    const datebox = $('<input>', {
        id: 'date-box-0',
    })
    .wrap($("<div>", {class: 'controls'})).parent();

    const label = $('<label/>', {
        class: 'control-label',
        text: 'Datebox'
    })

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, datebox, options])
}

const TextBox = () => {
    const textbox = $('<input/>', {
        id: 'text-box-0',
        cols: 70,
        rows: 4
    })
    .wrap($("<div>", {class: 'controls'})).parent();

    const label = $('<label/>', {
        class: 'control-label',
        text: 'TextBox'
    })

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, textbox, options])
}

const SectionLabel = () => {
    const sectionLabel = $('<h5/>', {
        id: 'section-label-0',
        class: 'control-label',
        text: 'SectionLabel'
    });

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([sectionLabel, options])
}

const Label = () => {
    const label = $('<label>', {
        id: 'label',
        class: 'control-label',
        text: 'Label'
    });

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, options])
}

const InfoLabel = () => {
    const infoLabel = $('<label/>', {
        id: 'info-label-0',
        class: 'control-label',
        text: 'InfoLabel'
    });

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([infoLabel, options])
}

const DropDown = () => {
    const dropdown = $('<select/>', {
        id: 'drop-down-0',
    })
    .wrap($("<div>", {class: 'controls'})).parent();

    const label = $('<label/>', {
        class: 'control-label',
        text: 'Dropdown'
    })

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, dropdown, options])
}


const TextArea = () => {
    const textarea = $('<textarea/>', {
        id: 'text-area-0',
        cols: 70,
        rows: 4
    })
    .wrap($("<div>", {class: 'controls'})).parent();

    const label = $('<label/>', {
        class: 'control-label',
        text: 'TextArea'
    })

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, textarea, options])
}


const InfoBox = () => {

    const header = $('<h6>', {
        id: 'header',
        class: 'bi bi-info-circle',
        text: ' '
    }).append('InfoBox Header');

    const body = $('<section>', {
        id: 'body',
        text: 'InfoBox Content'
    });

    const infoBox = $('<div>', {
        id: 'info-box-0'
    })
    .append([header, body])


    let options = Options();


    return $("<li>", {class: 'control-group'}).append([infoBox, options])
}


const CheckBox = () => {
    const checkBox = $('<input>', {
        id: 'check-box-0',
        type: 'checkbox'
    })
    .wrap($('<label>', {
        class: 'control-label'})).parent()
        .append('CheckBox');

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([checkBox, options])
}

const Table = () => {
    const tableRow = $('<td>')
    .wrap($("<tr>")).parent();

    const table = $('<table>', {
        id: 'table-0'
    })
    .append(tableRow)
    .wrap($("<div>", {class: 'controls'})).parent();

    const label = $('<label>', {
        class: 'control-label',
        text: 'Table'
    })

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, table, options])
}

const RadioButton = () => {
    const radioButton = $('<input>', {
        id: 'radio-button-0',
        type: 'radio'
    });

    const label = $('<label>', {
        // class: 'control-label',
        text: 'RadioButton',
        for: 'radio-button-0'
    });

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([radioButton, label, options])
}
