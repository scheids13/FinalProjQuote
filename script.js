// JavaScript Document

//window.onload = function()
$(function () {
    var btnStop = $("#btnStop");
    var btnStart = $('#btnStart');
    var quoteSpace = $("#area");
    var searchInput = $('#searchStr');
    var quotes = [];
    var checkNum = -1;
    var randomNum;
    var blnStart = true;

    //create quotes array
    $.getJSON("quotes.json", function (data) {
        //fill up quotes array
        $.each(data.quotes, function () {
            quotes.push(this);
            //alert(this.author);
        });
        QuoteAnew();
    });

    function QuoteAnew() {
        do {
            //alert("i'm in!");
            randomNum = Math.floor(Math.random() * quotes.length);
        }
        while (randomNum == checkNum);
        checkNum = randomNum;
        $(".quote").text(' ' + quotes[randomNum].text);
        $(".author").text(' ' + quotes[randomNum].author);
        $(".provider").text(" " + quotes[randomNum].provider);
        $(".tags").text(" " + quotes[randomNum].tags.join(", "));
    }
    //QuoteAnew();

    var myQuoteFeed = setInterval(QuoteAnew, 3000);
    
    btnStop.click(function () {
        if(blnStart == true){
            window.clearInterval(myQuoteFeed);
            btnStop.html("Start");
            blnStart = false;
        }
        else {
            myQuoteFeed = setInterval(QuoteAnew, 3000);
            btnStop.html("Stop");
            blnStart = true;
            $('#qDisp').html("");
            searchInput.val("");
        }
    });

    searchInput.keyup(function () {
        var resultSet = [];
        var reg = new RegExp(searchInput.val(), "i");

        //stop feed
        if (blnStart == true) {
            window.clearInterval(myQuoteFeed);
            btnStop.html("Start");
            blnStart = false;
        }

        var qDisplay = $('#qDisp');
        var content = "";
        for (var q = 0; q < quotes.length; q++) {
            if (reg.test(quotes[q].tags)) {
                resultSet.push(q);
                //console.log("Match: " + q + " " + searchInput.val() + " " + quotes[q].tags);
                content += '<span class="normal">Quote:</span><span class="quote">' + quotes[q].text + '</span><br /><span class="normal">Author:</span><span class="author">' + quotes[q].author + '</span><br /><span class="normal">Provider:</span><span class="provider">' + quotes[q].provider + '</span><br /><span class="normal">Tags:</span><span class="tags">' + quotes[q].tags + '</span><br /><br />';
            }
            else if (reg.test(quotes[q].text)) {
                resultSet.push(q);
                //console.log("Match: " + q + " " + searchInput.val() + " " + quotes[q].tags);
                content += '<span class="normal">Quote:</span><span class="quote">' + quotes[q].text + '</span><br /><span class="normal">Author:</span><span class="author">' + quotes[q].author + '</span><br /><span class="normal">Provider:</span><span class="provider">' + quotes[q].provider + '</span><br /><span class="normal">Tags:</span><span class="tags">' + quotes[q].tags + '</span><br /><br />';
            }
        }
        qDisplay.html(content);
    });

});