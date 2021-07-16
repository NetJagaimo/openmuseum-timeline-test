$(document).ready(function(){
  // chrome 透過 file:// 協定讀取檔案時會出現CORS Error，因此須將檔案用 Open with Live Server 開啟
  const BASE_URL = "http://127.0.0.1:5500";
  let baseDiv = $('.timeline-main');

  $.getJSON(`${BASE_URL}/test.json`, function(json) {
    let result = json.result;
    generateHTMLFromJSON(result);
  });

  function generateHTMLFromJSON(resultJSON) {
    resultJSON.forEach(result => {
      let date = "";      
      if (result.startDate === result.endDate) {
        date = result.startDate.replaceAll('-', '.');
      } else {
        date = `${result.startDate.replaceAll('-', '.')} - ${result.endDate.replaceAll('-', '.')}`;
      }

      let tags = "";
      result.tags.forEach(tag => {
        tags += `<span>${tag}</span>`
      });

      let resultHTML = `
        <a href="${result.url}">
          <div>
            <p>${date}</p>
            <h2>${result.title}</h2>
            ${tags}
          </div>
        </a>
        <hr />
      `

      baseDiv.append(resultHTML);

    });
  }
});