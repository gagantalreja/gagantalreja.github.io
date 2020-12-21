$(document).ready(function () {
    var html = "";
    $.ajax({
        'url': 'https://api.github.com/users/gagantalreja/repos?sort=date&direction=desc',
        'type': 'GET',
        'success': function (res) {
            for (var j = 0; j < 6;) {
                html += `<div class="row">`;
                for (i = 0; i < 2 && j < 8; i++) {
                    html += `<div class="col-sm-6">
                            <div class="card" style="width: 18rem; border: 2px solid #f58545; border-radius: 5px; padding: 10px; margin-top: 20px;">
                                <div class="card-header bg-transparent" style="">
                                    <p class="card-title"><strong>${res[j]["name"]}</strong></p>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">${res[j]["description"] || "None"}</p>
                                    <p class="card-text"><strong>Language: </strong>
                                        ${res[j]["language"] || "None"}
                                    </p>
                                    <a class="btn btn-sm" href=${res[j]["html_url"]}>View on Github</a>
                                </div>
                            </div>
                        </div>`;
                    j += 1;
                }
                html += "</div>";
            }
            $('.proj').html(html);
        }
    });
});

function postToGoogle(e) {
    e.preventDefault();
    const name = "name";
    const email = "email";
    const msg = "msg";
    const sub = "sub";

    var field1 = document.getElementById(name).value;
    var field2 = document.getElementById(email).value;
    var field3 = document.getElementById(sub).value + "\n\n" + document.getElementById(msg).value;
    console.log(field1 + " " + field2 + " " + field3);

    if (field1 === "") {
        alert('Please Fill Your Name');
        document.getElementById(name).focus();
        return false;
    }
    if (field2 === "") {
        alert('Please Fill Your Email');
        document.getElementById(email).focus();
        return false;
    }
    if (field3 === "" || field3.length > 500) {
        if (field3.length > 500) {
            alert('It should be less than 120 words');
        } else {
            alert('Your message should not be blank.');
        }
        document.getElementById(msg).focus();
        return false;
    }

    $.ajax({
        url: "https://docs.google.com/forms/d/e/1FAIpQLSdgw8cin8lYiMzFUU-n1iYSGYy4KVjfFQdKKF9ItR74Kdwj3Q/formResponse?",
        data: {
            "entry.1450210933": field1,
            "entry.1151854107": field2,
            "entry.1545417973": field3
        },
        type: "POST",
        dataType: "xml",
        success: function (d) {
            alert(d);
        },
        error: function (x, y, z) {
            alert('Your message has been sent successfully.😉');
            document.getElementById("cForm").reset();
        }
    });
    return false;
}
