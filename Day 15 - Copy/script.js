// document.getElementById('fetchData').addEventListener('click', () => {
  const data = [
      { id: 1, ad: 'Zehra', yas: 25 },
      { id: 2, ad: 'Fatime', yas: 30 },
      { id: 3, ad: 'Kerim', yas: 28 }
  ];

  const resultDiv = document.getElementById('resultDiv');
  resultDiv.innerHTML = ''; // Önceki sonuçları temizle

  data.forEach(item => {
      const p = document.createElement('p');
      p.textContent = `ID: ${item.id}, İsim: ${item.ad}, Yaş: ${item.yas}`;
      resultDiv.appendChild(p);
  });
// });