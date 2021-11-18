$( function() {
    $( "#sortable" ).sortable({
        handle: ".handle"
    });
    $( ".draggable" ).draggable({
        connectToSortable: "#sortable",
        helper: "clone",
        revert: "false",
        appendTo: "#sortable",
        distance: "100",
        stop: function( event, ui ) {
            let origElemID = ui.helper.prevObject.attr('id');
            let newElem = '';
            console.log("act full:",origElemID)
            console.log("act helper:",ui.helper)
            switch (origElemID){
                case 'date-box':
                    console.log('DateBox')
                    newElem = DateBox();
                    break;
                case 'text-box':
                    console.log('TextBox')
                    newElem = TextBox();
                    break;
                case 'section-label':
                    console.log('SectionLabel')
                    newElem = SectionLabel();
                    break;
                case 'label':
                    console.log('Label')
                    newElem = Label();
                    break;
                case 'info-label':
                    console.log('InfoLabel')
                    newElem = InfoLabel();
                    break;
                case 'drop-down':
                    console.log('DropDown')
                    newElem = DropDown();
                    break;
                case 'text-area':
                    console.log('TextArea')
                    newElem = TextArea();
                    break;
                case 'info-box':
                    console.log('InfoBox')
                    newElem = InfoBox();
                    break;
                case 'check-box':
                    console.log('CheckBox')
                    newElem = CheckBox();
                    break;
                case 'table':
                    console.log('Table')
                    newElem = Table();
                    break;
                case 'radio-button':
                    console.log('RadioButton')
                    newElem = RadioButton();
                    break;
                default: '';
            }
            ui.helper.replaceWith(newElem).draggable();
            $('.editable').attr('contenteditable', 'true');
            newElem.attr('id', getNewID(origElemID) )
            console.log(`\n\nFrom: ${origElemID}, To: ${newElem.attr('id')}`)

       },
    });
} );

function getNewID(id){
    return `${id}-${document.querySelectorAll(`*[class="control-group"][id*="${id}"]`).length}`;
}

const Options = () => {
    const dragBtn = $('<span>', {
        id: 'drag',
        class: 'btn handle bi bi-arrows-move',
        // type: 'button'
    })//.click(function(){});


    let menu = `
    <div class="dropdown">
    <span class="btn btn-primary  bi bi-tools" data-bs-toggle="dropdown">
    </span>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Option 1</a></li>
        <li><a class="dropdown-item" href="#">Option 2</a></li>
    </ul>
    </div>
    `;
    const editBtn = $(menu) 
    // {
    //     id: 'edit',
    //     class: 'bi bi-tools',
    //     // text: ''
    // }).click(function(){$(this).closest('li').remove()});

    const deleteBtn = $('<span>', {
        class: 'btn bi bi-trash',
        // text: 'X'
    }).click(function(){$(this).closest('li').remove()});

    return $("<div>", {class: 'options btn-group'}).append([dragBtn, editBtn, deleteBtn])
}

const DateBox = () => {
    const datebox = $('<input>', {
        // id: 'date-box-',
    })
    .wrap($("<div>", {class: 'controls'})).parent();

    const label = $('<label/>', {
        class: 'control-label editable',
        text: 'Datebox',
    });

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, datebox, options])
}

const TextBox = () => {
    const textbox = $('<input>', {
        // id: 'text-box-',
        cols: 70,
        rows: 4
    })
    .wrap($("<div>", {class: 'controls'})).parent();

    const label = $('<label>', {
        class: 'control-label editable',
        text: 'TextBox'
    })

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, textbox, options])
}

const SectionLabel = () => {
    const sectionLabel = $('<h5>', {
        // id: 'section-label-',
        class: 'control-label editable',
        text: 'SectionLabel'
    });

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([sectionLabel, options])
}

const Label = () => {
    const label = $('<label>', {
        // id: 'label',
        class: 'control-label editable',
        text: 'Label'
    });

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, options])
}

const InfoLabel = () => {
    const infoLabel = $('<label>', {
        // id: 'info-label-',
        class: 'control-label editable',
        text: 'InfoLabel'
    });

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([infoLabel, options])
}

const DropDown = () => {
    const dropdown = $('<select>', {
        // id: 'drop-down-',
    })
    .wrap($("<div>", {class: 'controls'})).parent();

    const label = $('<label>', {
        class: 'control-label editable',
        text: 'Dropdown'
    })

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, dropdown, options])
}


const TextArea = () => {
    const textarea = $('<textarea>', {
        // id: 'text-area-',
        cols: 70,
        rows: 4
    })
    .wrap($("<div>", {class: 'controls'})).parent();

    const label = $('<label>', {
        class: 'control-label editable',
        text: 'TextArea'
    })

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, textarea, options])
}


const InfoBox = () => {

    const header = $('<h6>', {
        // id: 'header',
        class: 'bi bi-info-circle editable',
        text: ' '
    }).append('InfoBox Header');

    const body = $('<section>', {
        // id: 'body',
        class: 'editable',
        text: 'InfoBox Content'
    });

    const infoBox = $('<div>', {
        // id: 'info-box-'
    })
    .append([header, body])


    let options = Options();


    return $("<li>", {class: 'control-group'}).append([infoBox, options])
}


const CheckBox = () => {
    const checkBox = $('<input>', {
        // id: 'check-box-',
        type: 'checkbox'
    })
    .wrap($('<label>', {
        class: 'control-label editable'})).parent()
        .append('CheckBox');

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([checkBox, options])
}

const Table = () => {
    const tableRow = $('<td>', {class: 'editable', text: 'column'})
    .wrap($("<tr>")).parent();

    const table = $('<table>', {
        // id: 'table-'
    })
    .append(tableRow)
    .wrap($("<div>", {class: 'controls'})).parent();

    const label = $('<label>', {
        class: 'control-label editable',
        text: 'Table'
    })

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([label, table, options])
}

const RadioButton = () => {
    const radioButton = $('<input>', {
        // id: 'radio-button-',
        type: 'radio'
    });

    const label = $('<label>', {
        class: 'editable',
        text: 'RadioButton',
        for: 'radio-button-'
    });

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([radioButton, label, options])
}
