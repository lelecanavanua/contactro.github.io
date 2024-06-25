const video = document.getElementById("qr-video");
const statusDiv = document.getElementById("call-status");

const qrScanner = new QrScanner(
  video,
  (result) => {
    if (result.startsWith("tel:")) {
      // Ask user if they want to call or text
      statusDiv.textContent = "Call or Text?";
      const callButton = document.createElement("button");
      callButton.textContent = "Call";
      callButton.onclick = () => (window.location.href = result);
      statusDiv.appendChild(callButton);

      const textButton = document.createElement("button");
      textButton.textContent = "Text";
      textButton.onclick = () =>
        (window.location.href = "sms:" + result.substring(4)); // Remove "tel:" for SMS
      statusDiv.appendChild(textButton);
    } else {
      statusDiv.textContent =
        "Invalid QR code. Please scan a phone number QR code.";
    }
  },
  { returnDetailedScanResult: true }
);

qrScanner
  .start()
  .then(() => (statusDiv.textContent = "QR scanner ready."))
  .catch(
    (err) => (statusDiv.textContent = "Camera access denied or error: " + err)
  );
