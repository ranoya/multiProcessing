/**
 * 
 * MULTIPROCESSING
 * Guilherme Ranoya, 2019
 * 
 * This javascript creates multiple ACE editors(embeddable code
 *  editor written in javascript) with multiple Processing 
 * livecode outputs into your HTML.
 *
 *  It is a tools designed to help document Processing codes
 *  on web pages, which also allows them to be interactive.
 *  
 * To use, first load the tool with <script>, and them,
 * create a <pre> element containing the Processing code,
 * with the class "processingeditor" and the property
 * targetId pointing to a <iframe> id wich will serve as output.
 * 
 * Ex:
 * <pre class='processingeditor' targetId='output'>
 * void draw() {
 *      fill(#FFFFFF);
 *      rect(20, 20, 100, 100);
 * }
 * </pre>
 * <iframe id='output'></iframe>
 * 
 * You can create as much <pre> and <iframe> you want
 * in your page.
 * 
 */


// INSERT ACE EDITOR INTO THE HTML DOCUMENT
document.write('<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.12/ace.js" type="text/javascript"></script>');


// INSERT PROCESSING.JS INTO THE OUTPUTS
const loadExtProcessing = `<style>body, html { margin: 0; padding: 0; }</style><canvas id='pjs' style='outline: none;'></canvas><script src='https://cdnjs.cloudflare.com/ajax/libs/processing.js/1.4.1/processing.min.js'></script><script type='application/processing' data-processing-target='pjs'>`;
const fechaExtProcessing = `</script>`;

var observadores = [];
var parEditor = [];
var parOutput = [];





// CHANGE EVENT FUNCTION (RUNS EVERYTIME AN EDITOR CONTENT CHANGE)
function changeContent(data, who, predata, extras) {

    if (who != undefined && who != "" && typeof document.getElementById(who) != undefined) {
        var iframeA = document.getElementById(who);
        iframeA = iframeA.contentWindow || (iframeA.contentDocument.document || iframeA.contentDocument);

        iframeA.document.open();
        iframeA.document.write(loadExtProcessing);
        iframeA.document.write(predata);
        iframeA.document.write(data);
        iframeA.document.write(extras);
        iframeA.document.write(fechaExtProcessing);
        iframeA.document.close();
    }

}


// RUN WHEN THE DOCUMENT FINISH LOADING
document.addEventListener('DOMContentLoaded', function () {

    // ACE DEFAULTS
    ace.require("ace/ext/language_tools");
    var ednum = 0;
    ace_config = {
        maxLines: Infinity,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: false,
        showPrintMargin: false,
        highlightSelectedWord: true,
        selectionStyle: "text",
        highlightActiveLine: false,
        cursorStyle: "wide",
        wrapBehavioursEnabled: true,
        wrap: true
    };


    // LOCATE ALL EDITORS
    let alleditors = document.querySelectorAll(".processingeditor");

    // CREATE ALL OUTPUT VIEWS AND CHANGE EVENTS LINKED TO THE EDITORS
    for (let i = 0; i < alleditors.length; i++) {


        targetId = "";

        ednum++;
        let este = alleditors[i];
        if (este.getAttribute('targetId') != undefined && este.getAttribute('data-name') != "") {
            _name = "" + este.getAttribute('targetId');
            targetId = _name;
        } else {
            _name = "processingeditor_" + ednum;
            targetId = "processingoutput_" + ednum;
        }



        esteID = "";

        if (este.id == undefined || este.id == "") {
            este.id = "processingeditor " + (Math.random() * 1000);
        }

        esteID = este.id;

        parOutput[i] = targetId;
        parEditor[i] = esteID;

        observadores[i] = new ResizeObserver(function (entries) {
            entries.forEach(function (entry) {

                mudaostamanhos(i, Math.round(entry.contentRect.width), Math.round(entry.contentRect.height));

            });
        });

        if (document.getElementById(targetId) != null) {

            observadores[i].observe(document.getElementById(targetId));

        }

        code = `var name = este.getAttribute('data-name');
                var linguagem_` + _name + ` = '';
                var acetheme_` + _name + ` = '';
                var customconfig_` + _name + ` = '';
                var precode_` + _name + ` = '';
                var postcode_` + _name + ` = '';
                if (typeof predata_` + _name + ` != 'undefined') {
                     precode_` + _name + ` = predata_` + _name + `;
                }
                if (typeof postdata_` + _name + ` != 'undefined') { 
                    postcode_` + _name + ` = postdata_` + _name + `;
                }
                if (este.getAttribute('data-linguagem')) { 
                    linguagem_` + _name + ` = este.getAttribute('data-linguagem');
                } else { 
                    linguagem_` + _name + ` = 'java';
                }
                if (este.getAttribute('data-acetheme')) { 
                    acetheme_` + _name + ` = este.getAttribute('data-acetheme');
                } else { 
                    acetheme_` + _name + ` = 'dreamweaver';
                }
                if (este.getAttribute('data-config')) { 
                    customconfig_` + _name + ` = sumprop(ace_config, este.getAttribute('data-config'));
                } else {
                    if (typeof acegeneralconfig != 'undefined') { 
                        customconfig_` + _name + ` = acegeneralconfig;
                    } else { 
                        customconfig_` + _name + ` = ace_config;
                    } 
                }
           ` + _name + ` = ace.edit('` + esteID + `');
           ` + _name + `.setTheme('ace/theme/' + acetheme_` + _name + `);
           ` + _name + `.getSession().setMode('ace/mode/' + linguagem_` + _name + `);
           ` + _name + `.setOptions(customconfig_` + _name + `);
               if (document.getElementById('` + targetId + `')) {
                   changeContent(` + _name + `.getSession().getValue(),'` + targetId + `', precode_` + _name + `, postcode_` + _name + `);
               ` + _name + `.getSession().on('change', function() {
                        changeContent(` + _name + `.getSession().getValue(), '` + targetId + `', precode_` + _name + `, postcode_` + _name + `);
                });
            }`;
        eval(code);
    }

});


// CHANGE SIZE FUNCTION PARAMETERS WHEN OUTPUT VIEW RESIZES
function mudaostamanhos(indice, w, h) {

    let changeSize = "size(" + w + "," + h + ");";

    let changeConteudo = ace.edit(parEditor[indice]).getValue();
    let mudando = changeConteudo.replace(/size\s*\(\s*([0-9])+\s*,\s*([0-9])+\s*\)\s*;/, changeSize);

    ace.edit(parEditor[indice]).setValue(mudando);
    ace.edit(parEditor[indice]).clearSelection();


}

// ADD CUSTOM PROPERTIES FOR DATA-CONFIG
function sumprop(objetoB, objetoA) {

    let xpto = JSON.parse(objetoA);
    let soma = {};


    for (propriedades in xpto) {
        soma[propriedades] = xpto[propriedades];
    }

    for (props2 in objetoB) {
        soma[props2] = objetoB[props2];
    }

    //console.table(objetoB);

    return soma;

}