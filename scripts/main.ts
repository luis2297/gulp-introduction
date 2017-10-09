/// <reference path="Footer.ts" />

import Footer =  mx.com.uadec.Footer;

function setFooter(name:string):void {
    var g = new Footer();
    var message = g.print(name);
    var footer = document.getElementsByTagName("footer")[0];
    footer.innerHTML = message;
}

setFooter("U.A. de C.");