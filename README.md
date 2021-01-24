# multiProcessing

---

multProcessing creates multiple ACE editors (embeddable code editor written in javascript) with multiple Processing livecode outputs into your HTML.

It is a tools designed to help document Processing codes on web pages, which also allows them to be interactive.

Created by [Prof. Guilherme Ranoya](https://www.ranoya.com) in 2019 under a General Public License (GPLv3) while writing his [online book on creative technologies](https://www.ranoya.com/books/public/tecnologiascriativas/) (in portuguese).

See a working example [here](https://www.ranoya.com/Assets/JSLibs/multiProcessing/example.html).

<br><br>

## How to use it?

---

The simplest way is to load de javascript into your code, create a `<pre>` element to be transformed in an Ace Editor with the `class='processingeditor'` and a `targetId="[iframe id]"` pointing to which `<iframe>` element will receive the output of the code. Only the `<pre>` elements with `class='processingeditor'` will be changed in the DOM.

Here is an example implementation:

```
<script src="https://www.ranoya.com/Assets/JSLibs/multiProcessing/multiProcessing.js"></script>

<pre class='processingeditor editorstyle' targetId="SketchOutput1">
void setup() {
size(150,150);
background(#78008A);
frameRate(20);
}

void draw() {
fill(#FFFFFF);
rect(20,20,100,100);
}
</pre>

<iframe id="SketchOutput1" class="outputstyle" frameborder=0></iframe>
```

You can use as many editors and outputs you want.

<br><br>

## How to lock or hide parts of the code

---

It's also possible to allow the editor to change only a part of the code. To to that, use the `predata_[targetId]` and `postdata_[targetId]` variables. Here is an example:

```
<script src="https://www.ranoya.com/Assets/JSLibs/multiProcessing/multiProcessing.js"></script>

 <script>
 predata_SketchOutput2 = `
 void setup() {
 size(1000,1000);
 background(#78008A);
 stroke(255);
 strokeWeight(10);
 }

 void draw() {
 `;

 postdata_SketchOutput2 = `
 }
 `;
 </script>

<pre class='processingeditor editorstyle' targetId="SketchOutput2">
line(20,20,400,300);
rect(50,50,40,40);
</pre>

<iframe id="SketchOutput2" class="outputstyle" frameborder=0></iframe>
```

In this example, only what is inside the `draw()` method is visible/editable.

#Using without an output

You can use multiProcessing only to show code with highlight and linting, and even make it non-editable.

To use multiProcessing without an output, simple don't declare the `targetIt` in the `<pre>` element, like these:

```
<script src="https://www.ranoya.com/Assets/JSLibs/multiProcessing/multiProcessing.js"></script>

<pre class='processingeditor editorstyle'>
void setup() {
size(150,150);
background(#78008A);
frameRate(20);
}

void draw() {
fill(#FFFFFF);
rect(20,20,100,100);
}
</pre>
```

To make the editor non-editable, or change any properties of the ACE Editor, you can use the `data-linguagem`, `data-acetheme` and `data-config` properties in the `<pre>` element.

`data-linguagem` changes the programming language highlight and linter.
`data-acetheme` changes de ACE Theme (color of the editor and highlight).
`data-config` changes de configuration of the ACE Editor.

Here is an example of changing the editor configuration:

```
<script src="https://www.ranoya.com/Assets/JSLibs/multiProcessing/multiProcessing.js"></script>

<pre class='processingeditor editorstyle bigger' data-linguagem="javascript"
data-acetheme="cobalt" data-config='{"highlightActiveLine":true,
"selectionStyle":"line", "foldStyle":"markbeginend",
"readOnly":true}'>
void setup() {
size(150,150);
background(#78008A);
frameRate(20);
}

void draw() {
fill(#FFFFFF);
rect(20,20,100,100);
}
</pre>
```

For ACE's color and themes, or languages avaliable, refere to [Aces Kitschen Sink](https://ace.c9.io/build/kitchen-sink.html).
For Ace's setup and configuration, refere to [Configuring Ace Github Page](https://github.com/ajaxorg/ace/wiki/Configuring-Ace)

To set global configuration for all ACE Editors, use the `acegeneralconfig` object:

```
<script>
acegeneralconfig = {
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
</script>
```

## <br><br><br>

### Dependencies

multiProcessing is dependent on (for obviously reasons) [ACE Editor](https://ace.c9.io/) and [Processing.js](https://github.com/processing-js/processing-js), and load them into the HTML from [cdnjs.cloudflare.com](https://cdnjs.cloudflare.com/).
