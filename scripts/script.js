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

            let newID =  getNewID(origElemID);
            newElem.attr('id', newID)
            newElem.find('.field-index').text(getNewIndex())

            console.log(`\n\nFrom: ${origElemID}, To: ${newElem.attr('id')}`);

            if(origElemID === 'drop-down'){
                newElem.find('.modal').attr('id', `${newID}-modal`)
                newElem.find('.modal-trigger').attr('data-bs-target', `#${newID}-modal`);
            }

       },
    });
} );

function getNewIndex(){
    return document.querySelectorAll('#sortable li').length - 1;
}

function getNewID(id){
    return `${id}-${document.querySelectorAll(`*[class="control-group"][id*="${id}"]`).length}`;
}


function findTargets(targets = []){
    return $('.field-index')
            .filter((ix, elm)=>targets.indexOf($(elm).text()) !== -1)
            .closest('li')
            .find('.controls input, label input, input[type="radio"], .controls select, .controls textarea, .info-container')
}

function attachEvent(caller, eventType, actions, option = ''){
    console.log(`\nATTACHING: ....When ${eventType} on ${option}, then:`, actions)
    $(caller).on(eventType, function(){
        let val = this.value;
        console.log('selected opt:',val)
        actions.forEach((obj)=>{
            console.log('running inside each:', obj)
            let $targets = findTargets(obj.items);
            console.log('TARGETS FOUND ARE:', $targets)
            if(val === option){
                switch(obj.action){
                    case 'show':
                        $targets.show();
                        break;
                    case 'hide':
                        $targets.hide();
                        break;
                    case 'enable':
                        $targets.prop('disabled', false);
                        break;
                    case 'disable':
                        $targets.prop('disabled', true);
                        break;
                    default: ''
                }
            }
        })
    })
}

const EventsWindow = (caller) => {
    const parentLi = $(caller).closest('li');
    let indexVal = parentLi.find('.field-index:first').text();
    console.log(caller,'_has ID:',caller.id,'_the vallll:', indexVal)
    const header = $('<div>', {class: 'evt-window-header'})
    .append([$('<h5>', {text: `#${indexVal}`}),
            $('<h5>', {class: 'title', text: 'Set event listener'}),
            $('<span>', {class: 'bi bi-x-square'}).click(()=>$('.evt-window').hide())])
 
    if(!caller.id){
        //On
    const onLabel = $('<span>', {
        class: 'input-group-text',
        text: 'On'
    });

    const onSelect = $('<select>', {
        class: 'form-select evt-select',
    }).append([
        $('<option>', {value: 'click', text: 'click'}), $('<option>', {value: 'change', text: 'change'}) 
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
    });//.append($('<option>', {value: 'show', text: '...'}));

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

    const secondRow = $('<div>', {class:'row mb-3  evt-action'}).append([doOuterWrapper, itemOuterWrapper]);
    

    const addActionLabel = $('<span>', {
        class: 'bi bi-plus-circle-fill',
        text: ' Add action'
    })
    .click(function(){
        let prevAction = $(this).parent().prev('.evt-action');
        prevAction.after(secondRow.clone())})
    .wrap($('<div>', {id: 'add-action-btn', class: 'btn btn-warning'})).parent();

    const firstOuterDiv = $('<div>', {class:'evt-group'}).append([firstRow, secondRow, addActionLabel, '<hr>']);


    const addEventButton = $('<span>', {
        class: 'bi bi-plus-circle-fill display-6',
    })
    .click(function(){
        let prevEvent = $(this).parent().prev('.evt-group');
        prevEvent.after(firstOuterDiv.clone(true))})
    .wrap($('<div>', {class: 'text-center'})).parent();

    const attachEventButton = $('<span>', {
        class: 'bi bi-check-lg',
        text: ' Attach event'
    })
    .wrap($('<div>', {id: 'attach-btn', class: 'btn btn-warning text-center'}))
    .parent()
    .click(()=>{
        parentLi.find('.evt-window .evt-group').each((ix, elm)=>{
            let eventType = $(elm).find('.row .evt-select:first').val();
            let option = $(elm).find('.row .evt-option:first').val();
            let actionsObj = $(elm).find('.row.evt-action');
            let actions = [];
            actionsObj.each((ix2, elm2)=>{
                let action = $(elm2).find('.evt-do').val();
                let items = $(elm2).find('.evt-item').val().trim();
                if(items.length > 0){
                    items = items.split(';');
                    actions.push({action: action, items: items});
                }
            });
            console.log(elm, `....When ${eventType} on ${option}, then:`, actions)

            attachEvent(caller, eventType, actions, option)
        })
    });

    return $('<div>', {class: 'bg-secondary evt-window',}).append([header, firstOuterDiv, addEventButton, '<hr>', attachEventButton]).clone(true);

    }
    
}

const Options = (field) => {
    const fieldIndex = $('<span>', {class: 'field-index', text: '0'});
    const dragBtn = $('<span>', {
        id: 'drag',
        class: 'handle bi bi-arrows-move',
    });

    const editBtn = $('<span>', {
        id: 'edit',
        class: 'bi bi-tools',
    }).click(function(){
        let parentLi = $(this).closest('li');
        let isEvtWindowCreated = parentLi.find('.evt-window').length === 1;

        $('.evt-window').hide();
        isEvtWindowCreated ? parentLi.find('.evt-window').show() : parentLi.append(EventsWindow(field || this));
        let evtOptions = parentLi.find('.evt-option');
        let selectOptions = parentLi.find('.controls select').children();
        
        evtOptions.each((ix, elm)=>{
            console.log('evt-opt:',elm)
            let $evtOption = $(elm);
            let selected = $evtOption.val();
            $evtOption.empty();
            $evtOption.append($('<option>'),{text: '...'});
            selectOptions.clone().appendTo($evtOption);
            $evtOption.val(selected);
        });
        
    });

    const deleteBtn = $('<span>', {
        class: 'bi bi-trash',
    }).click(function(){$(this).closest('li').remove()});

    const container = $("<div>", {class: 'btn-group'}).append([dragBtn, editBtn, deleteBtn])

    return $("<div>", {class: 'options'}).append([fieldIndex, container])
    // return $("<div>", {class: 'options btn-group'}).append([fieldIndex, dragBtn, editBtn, deleteBtn])
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


const Modal = () => {
    const modalHeader = $('<div>', {class:'modal-header'}).append([
        $('<h6>', {class:'modal-title', text: 'Add each option on a new line'}),
        $('<input>',{type:'button', class:'btn-close', 'data-bs-dismiss':'modal'})
    ]);

    const modalBody = $('<div>', {class:'modal-body'}).append([
        $('<textarea>', {cols: 33, rows:'4'})
    ]);

    const updateButton = $('<input>',{type:'button', class:'btn btn-success', 'data-bs-dismiss':'modal', value: 'Update options'})
    .click(function(){
        let select = $(this).closest('li').find('.controls select').empty();
        let modal = $(this).closest('li').find('.modal textarea');

        let options = modal.val().trim().split('\n');
        console.log('modal list is--->', options)
        select.append($('<option>', {text: '...'}));
        
        for(let option of options){
            let txt = option.trim();
            txt.length ? select.append($('<option>', {text: txt, value: txt})) : '';
        }
    })
    const modalFooter = $('<div>', {class:'modal-footer'}).append([updateButton]);

    const modalContent = $('<div>', {class:'modal-content'}).append([modalHeader, modalBody, modalFooter]);
    const modalDialog = $('<div>', {class:'modal-dialog modal-sm'}).append(modalContent);
    
    return $('<div>', {class:'modal', id:''}).append(modalDialog);
}

const DropDown = () => {

    // const modal = $()
    const dropdown = $('<select>');
    const dropdownCombo = $("<div>", {class: 'controls'}).append([
        $('<span>', {class: 'modal-trigger bi bi-pencil-fill', 'data-bs-toggle':'modal', 'data-bs-target': '#'}),
        dropdown
    ]);

    const label = $('<label>', {
        class: 'control-label editable',
        text: 'Dropdown'
    })

    let options = Options(dropdown);


    return $("<li>", {class: 'control-group'}).append([label, dropdownCombo, Modal(), options])
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
        class: 'info-container'
    })
    .append([header, body])


    let options = Options();


    return $("<li>", {class: 'control-group'}).append([infoBox, options])
}


const CheckBox = () => {
    const checkBox = $('<input>', {
        type: 'checkbox'
    });

    const label = $('<label>', {class: 'control-label editable extensive-label'})
        .append([checkBox, 'CheckBox']);

    let options = Options(checkBox);


    return $("<li>", {class: 'control-group'}).append([label, options])
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
        type: 'radio'
    });

    const label = $('<label>', {
        class: 'editable extensive-label',
        text: 'RadioButton',
        for: 'radio-button-'
    });

    let options = Options(radioButton);


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