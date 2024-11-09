if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.log('ServiceWorker registration failed: ', error);
        });
    });
  }

document.getElementById('readNfcButton').addEventListener('click', async () => {
    if ('NDEFReader' in window) {
      try {
        const ndef = new NDEFReader();
        await ndef.scan();
        ndef.onreading = event => {
          const message = event.message;
          const output = document.getElementById('output');
          output.innerHTML = 'NFC tag read: ' + message.records.map(record => record.data).join(', ');
        };
        alert('NFC reader started');
      } catch (error) {
        alert('Error reading NFC tag:', error);
      }
    } else {
      alert('NFC is not supported on this device');
    }
  });
  
  document.getElementById('writeNfcButton').addEventListener('click', async () => {
    if ('NDEFWriter' in window) {
      try {
        const ndef = new NDEFWriter();
        await ndef.write('Hello, NFC!');
        console.log('NFC tag written');
      } catch (error) {
        console.error('Error writing NFC tag:', error);
      }
    } else {
      alert('NFC is not supported on this device');
    }
  });