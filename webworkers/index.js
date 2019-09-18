if (window.Worker) {
  const myWorker = new Worker('worker.js');

  myWorker.onmessage = function (e) {
    console.log('total', e.data);
  };

  const btn1 = document.getElementById('btn1');
  const btn2 = document.getElementById('btn2');

  btn1.addEventListener('click', function () {
    let total = 1;

    for (let i = 0; i < 5000000000; i++) {
      total += i;
    }

    console.log('total', total);
  })

  btn2.addEventListener('click', function () {
    myWorker.postMessage('total');
  });

}
