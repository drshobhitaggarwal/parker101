/* Contact form: sends the message to your inbox through Web3Forms.
   The access key lives in contact.html (hidden input named "access_key"). */
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;

  var status = document.getElementById("form-status");
  var button = form.querySelector("button[type=submit]");
  var message = form.elements["message"];

  // Pre-fill the message when a visitor arrives from a watch on the Showcase page.
  var watch = new URLSearchParams(window.location.search).get("watch");
  if (watch && message && !message.value) {
    message.value = "I'd like to know more about the " + watch.slice(0, 60) + ". ";
  }

  function say(text, kind) {
    status.textContent = text;
    status.className = "status" + (kind ? " " + kind : "");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }

    var key = form.elements["access_key"].value;
    if (!key || key.indexOf("PASTE") === 0) {
      console.error("Contact form: add your Web3Forms access key to contact.html (see README.md).");
      say("Message not sent. This form is not connected to email yet.", "err");
      return;
    }

    var data = {
      access_key: key,
      subject: "New enquiry from the website",
      from_name: "Parker 101 website",
      name: form.elements["name"].value.trim(),
      email: form.elements["email"].value.trim(),
      phone: form.elements["phone"].value.trim(),
      message: form.elements["message"].value.trim(),
      botcheck: form.elements["botcheck"].checked
    };

    button.disabled = true;
    say("Sending…", "");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(data)
    })
      .then(function (r) { return r.json().then(function (j) { return { ok: r.ok && j.success, body: j }; }); })
      .then(function (res) {
        if (!res.ok) throw new Error((res.body && res.body.message) || "Request failed");
        var sent = document.getElementById("sent");
        document.getElementById("sent-email").textContent = data.email;
        form.hidden = true;
        sent.hidden = false;
        sent.focus();
      })
      .catch(function (err) {
        console.error("Contact form:", err);
        button.disabled = false;
        say("Message not sent. Check your connection and try again.", "err");
      });
  });
})();
