function changequanity() {
    var x = document.getElementById("quanityID").value;
    document.getElementById("demo").innerHTML = "You changed Quanity to: " + x;
}

function updatesub() {

    var x = document.getElementById("quanityID").value;
    var y = document.getElementById("priceID").value;
    var t = 0.06;
    var xy = 0.00;
    
	while ( x > 0 ) {
        xy = parseFloat(xy) + parseFloat(y);
        x--;
    }
    
    document.getElementById("subtotalID").value = xy.toFixed(2);
    
    var tt = t * xy;
    document.getElementById("taxID").value = tt.toFixed(2);
    
    var am = xy + tt;
    document.getElementById("amountID").value = am.toFixed(2);
    
    document.getElementById("demo").innerHTML = "You changed Quanity to: " + xy;
}

function showuser() {

    if (str == "") {

        document.getElementById("txtHint").innerHTML = "";
        return;

    } else { 

        if (window.XMLHttpRequest) {

            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();

        } else {

            // code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

        }

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("txtHint").innerHTML = this.responseText;
            }

        };

        xmlhttp.open("GET","getuser.php?q="+str,true);
        xmlhttp.send();
    }

}

