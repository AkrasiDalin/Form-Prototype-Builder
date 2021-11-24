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
                case 'submission':
                    console.log('Submission')
                    newElem = Submission();
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

const EventsWindow = () => {
    //On
    const onLabel = $('<span>', {
        class: 'input-group-text',
        text: 'On'
    });

    const onSelect = $('<select>', {
        class: 'form-select evt-select',
    }).append([
        $('<option>', {value: 'click', text: 'click'}), $('<option>', {value: 'select', text: 'select'}) 
    ]);

    const onOuterWrapper =  $('<div>', {class: 'input-group input-group-sm'})
    .append([onLabel, onSelect])
    .wrap($('<div>',{class: 'col-5 form-inline'})).parent();


    //Options
    const optionLabel = $('<span>', {
        class: 'input-group-text',
        text: 'Option'
    });

    const optionSelect = $('<select>', {
        class: 'form-select evt-option',
    }).append($('<option>', {value: 'show', text: '...'}));

    const optionOuterWrapper =  $('<div>', {class: 'input-group input-group-sm'})
    .append([optionLabel, optionSelect])
    .wrap($('<div>',{class: 'col-7 form-inline'})).parent();

    const firstRow = $('<div>', {class:'row mb-3'}).append([onOuterWrapper, optionOuterWrapper]);


    //Do
    const doLabel = $('<span>', {
        class: 'input-group-text',
        text: 'Do'
    });

    const doSelect = $('<select>', {
        class: 'form-select evt-do',
    }).append([
        $('<option>', {value: 'show', text: 'show'}), $('<option>', {value: 'hide', text: 'hide'}),
        $('<option>', {value: 'enable', text: 'enable'}), $('<option>', {value: 'disable', text: 'disable'}), 
    ]);

    const doOuterWrapper =  $('<div>', {class: 'input-group input-group-sm'})
    .append([doLabel, doSelect])
    .wrap($('<div>',{class: 'col-5 form-inline'})).parent();


    //Item(s)
    const itemLabel = $('<span>', {
        class: 'input-group-text',
        text: 'Item(s)'
    });

    const itemInput = $('<input>', {
        class: 'form-control evt-item',
    });

    const itemOuterWrapper =  $('<div>', {class: 'input-group input-group-sm'})
    .append([itemLabel, itemInput])
    .wrap($('<div>',{class: 'col-7 form-inline'})).parent();

    const secondRow = $('<div>', {class:'row mb-3'}).append([doOuterWrapper, itemOuterWrapper]);
    

    const firstOuterDiv = $('<div>', {class:'event-group'}).append([firstRow, secondRow]);


    const addActionLabel = $('<span>', {
        class: 'bi bi-plus-circle-fill',
        text: ' Add action'
    }).wrap($('<div>', {id: 'add-action-btn', class: 'btn btn-warning'})).parent();

    const addEventButton = $('<span>', {
        class: 'bi bi-plus-circle-fill display-6',
    }).wrap($('<div>', {class: 'text-center'})).parent();

    const attachEventButton = $('<span>', {
        class: 'bi bi-plus-circle-fill',
        text: ' Attach event'
    }).wrap($('<div>', {id: 'attach-btn', class: 'btn btn-warning text-center'})).parent();

    return $('<div>', {class: 'bg-secondary event-window'}).append([firstOuterDiv, addActionLabel, '<hr>', addEventButton, '<hr>', attachEventButton]);

}

const Options = () => {
    const dragBtn = $('<span>', {
        id: 'drag',
        class: 'btn handle bi bi-arrows-move',
    });

    const editBtn = $('<span>', {
        id: 'edit',
        class: 'bi bi-tools',
    }).click(function(){$(this).closest('li').append(EventsWindow())});

    const deleteBtn = $('<span>', {
        class: 'btn bi bi-trash',
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
        class: 'control-label editable extensive-label',
        text: 'SectionLabel'
    });

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([sectionLabel, options])
}

const Label = () => {
    const label = $('<label>', {
        // id: 'label',
        class: 'control-label editable extensive-label',
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
        class: 'control-label editable extensive-label'})).parent()
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
        class: 'editable extensive-label',
        text: 'RadioButton',
        for: 'radio-button-'
    });

    let options = Options();


    return $("<li>", {class: 'control-group'}).append([radioButton, label, options])
}


const Submission = () => {
    const submit = $('<input>', {
        type: 'button',
        value: 'SUBMIT',
        class: 'btn bg-success text-light m-2'
    });
    const cancel = $('<input>', {
        type: 'button',
        value: 'CANCEL',
        class: 'btn btn-outline-dark'
    });

    return $("<li>", {class: 'control-group text-center'}).append([submit, cancel])
}